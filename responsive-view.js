var devices = {};
var currentdevices = "iphone5";
var currentFormat = "portrait";
var responsiveFrame = "";
var responsiveImage = "";
var clicked = false, clickY, isActiveScroll = true;
if (typeof responsivePath === 'undefined') {
    var responsivePath = "";
}

jQuery(document).ready(function () {
    jQuery("#responsive_view").on("click", function (event) {
        event.preventDefault();
        displayResponsive();
    });
    jQuery("#responsive-appareil").on("change", function (event) {
        event.preventDefault();
        currentdevices = jQuery(this).val();
        displayResponsive();
    });
    jQuery("#responsive-format").on("change", function (event) {
        event.preventDefault();
        currentFormat = jQuery(this).val();
        displayResponsive();
    });
    jQuery("#responsive-close").on("click", function (event) {
        event.preventDefault();
        jQuery("#test").hide();
    })

    jQuery("#responsive-frame").on("load", function () {
        responsiveFrame = jQuery("#responsive-frame");

        /** Hide ScrollBar **/
        jQuery(responsiveFrame).contents().find("html").css("overflow", "hidden");

        /** Scroll Event **/
        jQuery(responsiveFrame).contents().find("html").on({
            'mousemove': function (e) {
                clicked && isActiveScroll && updateScrollPos(e);
                console.log("mousemove");
            },
            'mousedown': function (e) {
                clicked = true;
                clickY = e.pageY;
                console.log("mousedown");
            },
            'mouseup': function () {
                clicked = false;
                jQuery(responsiveFrame).contents().find("html").css('cursor', 'grab');
                console.log("mouseup");
            }
        });
        jQuery(document).on("mouseup", function() {
            clicked = false;
            jQuery(responsiveFrame).contents().find("html").css('cursor', 'grab');
            console.log("mouseup");
        });

        jQuery(responsiveFrame).contents().find("body").css("user-select", "none");

        jQuery(responsiveFrame).contents().scrollTop(
            jQuery(responsiveFrame).contents().find("#wpadminbar").height()
        );

        jQuery(responsiveFrame).contents().find("body").hover(function () {
            jQuery(this).css('cursor', 'grab');
        }, function () {
            jQuery(this).css('cursor', 'auto');
        });
    });
    initVariables();
});

var initVariables = function () {
    devices.iphone4 = {};
    devices.iphone4.width = 640;
    devices.iphone4.height = 960;
    devices.iphone4.ratio = 2;
    devices.iphone4.userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25";
    devices.iphone4.image = responsivePath + "images/iphone4";
    devices.iphone4.padding = "132px 26px 130px 31px";


    devices.iphone5 = {};
    devices.iphone5.width = 640;
    devices.iphone5.height = 1136;
    devices.iphone5.ratio = 2;
    devices.iphone5.userAgent = "Mozilla/5.0 (iPad; CPU OS 7_0_2 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A501 Safari/9537.53";
    devices.iphone5.image = responsivePath + "images/iphone5";
    devices.iphone5.padding = "111px 23px 107px 27px";


    devices.ipad = {};
    devices.ipad.width = 1536;
    devices.ipad.height = 2048;
    devices.ipad.ratio = 2;
    devices.ipad.userAgent = "Mozilla/5.0 (iPad; CPU OS 7_0_2 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A501 Safari/9537.53";
    devices.ipad.image = responsivePath + "images/ipad";
    devices.ipad.padding = "107px 52px";

}

var displayResponsive = function () {
    responsiveFrame = jQuery("#responsive-frame");
    responsiveImage = jQuery("#responsive-images");

    //event.preventDefault();
    jQuery("#test").show();
    //jQuery(responsiveFrame).attr("width", parseInt(devices[currentdevices].width / devices[currentdevices].ratio));
    //jQuery(responsiveFrame).attr("height", parseInt(devices[currentdevices].height / devices[currentdevices].ratio));

    var width = parseInt(devices[currentdevices].width / devices[currentdevices].ratio);
    var height = parseInt(devices[currentdevices].height / devices[currentdevices].ratio);

    /** Padding And Background-Image**/
    jQuery(responsiveImage).css("padding", devices[currentdevices].padding);
    ////console.log("background-image", "url(" + devices[currentdevices].image + "-" + currentFormat + ".png)");
    jQuery(responsiveImage).css("background-image", "url(" + devices[currentdevices].image + "-" + currentFormat + ".png)");
    jQuery(responsiveImage).css("width", width);
    jQuery(responsiveImage).css("height", height);

    /** Set Width And Height of Frame **/
    if (currentFormat == "paysage") {
        var temp = width;
        width = height;
        height = temp;
        paddingToLandscape();
        jQuery(responsiveImage).addClass("responsiveportrait");
    } else {
        jQuery(responsiveImage).removeClass("responsiveportrait");
    }

    /** Set Device Size**/
    var widthDevice = parseInt(width + parseInt(jQuery(responsiveImage).css("padding-left")) + parseInt(jQuery(responsiveImage).css("padding-right")));
    var heightDevice = parseInt(height + parseInt(jQuery(responsiveImage).css("padding-top")) + parseInt(jQuery(responsiveImage).css("padding-bottom")));

    var outerHeight = jQuery(responsiveImage).outerHeight();
    var outerWidth = jQuery(responsiveImage).outerWidth();

    /** Resize **/
    var margetop = jQuery(".responsiveview").height() + jQuery("#wpadminbar").height();
    var heightscreen = jQuery(window).height() - margetop;
    var ratio = heightscreen / outerHeight;
    var padding = "";
    padding += jQuery(responsiveImage).css("padding-top");
    padding += " " + jQuery(responsiveImage).css("padding-right");
    padding += " " + jQuery(responsiveImage).css("padding-bottom");
    padding += " " + jQuery(responsiveImage).css("padding-left");

    //console.log("-------------------------------------------------------------------------------------");
    //console.log("ratio", ratio);
    //console.log("Before");
    //console.log("height", height);
    //console.log("heightscreen", heightscreen);
    //console.log("heightDevice", heightDevice);
    //console.log("width", width);
    //console.log("widthscreen", widthscreen);
    //console.log("widthDevice", widthDevice);
    if (heightscreen < outerHeight) {
        /** Screen **/
        height = parseInt(height * ratio);
        width = parseInt(width * ratio);
        /** Padding **/
        padding = resizePadding(ratio, "*");
        /** Device **/
        widthDevice = widthDevice * ratio;
        heightDevice = heightDevice * ratio;
    }
    var widthscreen = jQuery(window).width();
    if (widthscreen < outerWidth) {
        /** Screen **/
        width = parseInt(width * ratio);
        height = parseInt(height / ratio);
        /** Padding **/
        padding = resizePadding(ratio, "/");
        /** Device **/
        widthDevice = widthDevice / ratio;
        heightDevice = heightDevice / ratio;
    }
    //console.log("padding", padding);

    /** Center Vertical **/
    var margintop = parseInt((heightscreen - heightDevice) / 2);
    jQuery(responsiveImage).css("margin-top", margintop + margetop);


    //console.log("After");
    //console.log("height", height);
    //console.log("heightscreen", heightscreen);
    //console.log("heightDevice", heightDevice);
    //console.log("width", width);
    //console.log("widthscreen", widthscreen);
    //console.log("widthDevice", widthDevice);
    /** Set Velues**/
    jQuery(responsiveImage).css("padding", padding);

    jQuery(responsiveImage).css("width", width);
    jQuery(responsiveImage).css("height", height);

    jQuery(responsiveImage).css("background-size", parseInt(widthDevice) + "px " + parseInt(heightDevice) + "px");

}

var updateScrollPos = function (e) {
    isActiveScroll = false;
    jQuery(responsiveFrame).contents().find("html").css('cursor', 'grabbing');
    var delay = 1;
    var framehtml = jQuery(responsiveFrame).contents();
    var scrollsize = (clickY - e.pageY)
    //console.log(jQuery(responsiveFrame).contents().find("body,html").scrollTop(),"+",(clickY - e.pageY),stop);
    console.log(jQuery(framehtml).scrollTop(), scrollsize, jQuery(framehtml).scrollTop() + scrollsize);
    jQuery(framehtml).scrollTop(jQuery(framehtml).scrollTop() + scrollsize);
    setTimeout(function() {isActiveScroll = true;},25);
    //jQuery(responsiveFrame).contents().find("body, html").stop().animate({scrollTop: stop}, delay)
}

var resizePadding = function (ratio, operateur) {
    var top = 0;
    var right = 0;
    var left = 0;
    var bottom = 0;
    if (operateur == "/") {
        //console.log(operateur);
        top = parseInt(parseInt(jQuery(responsiveImage).css("padding-top")) / ratio);
        right = parseInt(parseInt(jQuery(responsiveImage).css("padding-right")) / ratio);
        bottom = parseInt(parseInt(jQuery(responsiveImage).css("padding-bottom")) / ratio);
        left = parseInt(parseInt(jQuery(responsiveImage).css("padding-left")) / ratio);
    } else if (operateur == "*") {
        //console.log(operateur);
        top = parseInt(parseInt(jQuery(responsiveImage).css("padding-top")) * ratio);
        right = parseInt(parseInt(jQuery(responsiveImage).css("padding-right")) * ratio);
        bottom = parseInt(parseInt(jQuery(responsiveImage).css("padding-bottom")) * ratio);
        left = parseInt(parseInt(jQuery(responsiveImage).css("padding-left")) * ratio);
    }
    //console.log(top+"px "+right+"px "+bottom+"px "+left+"px");
    //console.log(top, right, bottom, left);
    return top + "px " + right + "px " + bottom + "px " + left + "px";
}

var paddingToLandscape = function () {
    var temp = jQuery(responsiveImage).css("padding-top");
    jQuery(responsiveImage).css("padding-top", jQuery(responsiveImage).css("padding-right"));
    jQuery(responsiveImage).css("padding-right", jQuery(responsiveImage).css("padding-bottom"));
    jQuery(responsiveImage).css("padding-bottom", jQuery(responsiveImage).css("padding-left"));
    jQuery(responsiveImage).css("padding-left", temp);
}
