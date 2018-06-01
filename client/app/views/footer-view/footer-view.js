var View = require('./../view');

module.exports = class FooterView extends View {
    initialize(){
        super.initialize();
        this.container = $('body');
        this.noWrap = true;
    }

    getTemplateFunction() {
        return require('./templates/footer-view')
    }
};