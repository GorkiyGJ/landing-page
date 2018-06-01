var View = require('./../view');

module.exports = class HomePageView extends View {
    initialize(params){
        super.initialize(params);
        this.noWrap = true;
    }   

    getTemplateFunction() {
        return require('./templates/home-page-view')
    }
};