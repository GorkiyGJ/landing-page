var PageController = require('./page-controller');
var HomePageView = require('./../views/home-page-view');

class HomePageController extends PageController {
    getPageName() {
        return 'home-page'
    }

    index() {
        this.view = new HomePageView( { autoRender:true, container: $('content') } )
    }
}

module.exports = HomePageController;