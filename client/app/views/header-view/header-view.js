var View = require('./../view');

module.exports = class HeaderView extends View {
    initialize(){
        super.initialize();
        this.container = $('body');
        this.noWrap = true;
    }

    attach(){
        super.attach();

        $(this.el).find('a.menu-item').on('click', function(event){
            event.preventDefault();

            var $anchor = $( $.attr(this, 'href') );
            if(!$anchor)
                return;

            $('html, body').animate({
                scrollTop: $anchor.offset().top
            }, 500);
        })

    }

    getTemplateFunction() {
        return require('./templates/header-view')
    }
};