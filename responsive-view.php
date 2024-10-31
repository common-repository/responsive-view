<?php
/**
 * Date: 24/04/14
 * Plugin Name: Responsive-View
 * Description: To preview a live mobile version of your website
 * Version: 0.1
 * Author: Fredel
 * License: GPL2 license
 */

add_action('add_meta_boxes', 'meta_box_responsiveView');

function meta_box_responsiveView() {
    add_meta_box("responsiveview", __("Responsive View", "responsive-view" ) , "responsiveViewContent");
}

function responsiveViewContent() {
    ?>
    <div class="responsiveview">
        <div><a id="responsive_view" target="wp-preview" class="various button"><?= __("Preview mobile version", "responsive-view") ?></a></div>
    </div>
    <div id="test">
        <div class="responsiveview">
            <div>
                <label><?= __("Device", "responsive-view") ?></label>
                <select name="responsive-appareil" id="responsive-appareil">
                    <option value="iphone4">IPhone 4</option>
                    <option value="iphone5" selected="selected">IPhone 5</option>
                    <option value="ipad">IPad</option>
                </select>
            </div>
            <div>
                <label>Format</label>
                <select name="responsive-format" id="responsive-format">
                    <option value="portrait" selected="selected"><?= __("Portrait", "responsive-view") ?></option>
                    <option value="paysage"><?= __("Landscape", "responsive-view") ?></option>
                </select>
            </div>
            <div id="responsive-close" class="button"><?= __("Exit", "responsive-view") ?></div>
        </div>
        <div id="responsive-images">
            <iframe id="responsive-frame" src="<?= get_permalink() ?>?&preview=true&responsive=true"></iframe>
        </div>
    </div>
    <script type="application/javascript">
        var responsivePath = "<?= plugin_dir_url(__FILE__) ?>";
    </script>
<?php
}

function resonsive_view_enqueue_script() {
    wp_enqueue_script("responsive-view", plugin_dir_url(__FILE__) . "responsive-view.js");
    wp_enqueue_style("responsive-view", plugin_dir_url(__FILE__) . "css/" . "responsive-view.css");
}

add_action('admin_print_scripts', 'resonsive_view_enqueue_script');

load_plugin_textdomain('responsive-view',false, dirname(plugin_basename( __FILE__ ) ) . '/lang/');
