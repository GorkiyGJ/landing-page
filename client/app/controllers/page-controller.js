var HeaderView = require('./../views/header-view/header-view');
var ContentView = require('./../views/content-view');
var FooterView = require('./../views/footer-view');

class PageController extends Chaplin.Controller {
    
    getPageName() {
        throw new Error('Must be implemented')
    }

    beforeAction() {
        $('body').attr('pagename', this.getPageName());
        super.beforeAction.apply(arguments);
        this.reuse('header-view', HeaderView);
        this.reuse('content-view', ContentView);
        this.reuse('footer-view', FooterView);
    }

    index() {
        throw new Error('Must be implemented')
    }
}

module.exports = PageController;