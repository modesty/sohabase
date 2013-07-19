var SOHAPub = (function ($) {
    "use strict";

    // private static
    var _nextId = 1;

    // constructor
    var cls = function () {
        // private, only accessible within this constructor
        var _id = _nextId++;

        // public (every instance will have their own copy of these methods, needs to be lightweight)
        this.get_id = function () {
            return _id;
        };

        this.pageName = "";
        this.isChinese = false;
    };

    // public static
    cls.get_nextId = function () {
        return _nextId;
    };

    // public (every instance will share the same method, but has no access to private fields defined in constructor)
    cls.prototype.initHeader = function () {
        $.soha.loadPageCSS('css/cbexp.header.css');
        $.soha.loadContentHTML('pageHeader', 'html/_header.html');
    };

    cls.prototype.initFooter = function () {
        $.soha.loadPageCSS('css/cbexp.footer.css');
        $.soha.loadContentHTML('pageFooter', 'html/_footer.html');
    };

    cls.prototype.renderGreenTheme = function() {
        $.soha.loadPageCSS('css/cbexp.demo.green.css');
        $.soha.loadPageCSS('css/layout/cbexp.layout.2column.css');
    };

    cls.prototype.renderBlueTheme = function() {
        $.soha.loadPageCSS('css/cbexp.demo.blue.css');
        $.soha.loadPageCSS('css/layout/cbexp.layout.2column_r.css');
    };

    cls.prototype.initPage = function () {
        var qs = $.soha.getQueryString();
        if (!_.isObject(qs)) {
            $.soha.navigate('?headerfooter=both&theme=blue');
        }
        else {
            var paramCT = qs['theme'];
            if (paramCT === "green")
                this.renderGreenTheme();
            else if (paramCT === "blue")
                this.renderBlueTheme();

            var paramHF = qs['headerfooter'];
            if (paramHF === 'header') {
                this.initHeader();
            }
            else if (paramHF === 'footer') {
                this.initFooter();
            }
            else if (paramHF == 'both') {
                this.initHeader();
                this.initFooter();
            }
        }

        $('#pageContainer').fadeIn('slow');
    };

    return cls;
})(jQuery);

$(function () {
    (new SOHAPub()).initPage();
});
