import routes from './routes'

class Application extends Chaplin.Application {

    initialize(options){
        super.initialize.apply(arguments);
    }

    initRouter() {
        super.initRouter.apply(arguments)
    }

    initDispatcher(){
        super.initDispatcher.apply(arguments)
    }

    initLayout(){
        super.initLayout.apply(arguments)
    }

    initMediator(){
        super.initMediator.apply(arguments)
    }

    initBackbone() {
        super.initBackbone.apply(arguments)
    }

    start() {
        super.start.apply(arguments)
    }
}

$(document).ready(()=> {
        new Chaplin.Application({ routes: routes, controllerSuffix: '-controller' });
        return
    }
);