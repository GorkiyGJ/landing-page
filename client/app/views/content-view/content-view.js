var View = require('./../view');

module.exports = class ContentView extends View {
    initialize(){
        super.initialize();
        this.container = $('body');
        this.noWrap = true;
    }

    getTemplateFunction() {
        return require('./templates/content-view')
    }
};