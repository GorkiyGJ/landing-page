(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("controllers/home-page-controller.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageController = require('./page-controller');
var HomePageView = require('./../views/home-page-view');

var HomePageController = function (_PageController) {
    _inherits(HomePageController, _PageController);

    function HomePageController() {
        _classCallCheck(this, HomePageController);

        return _possibleConstructorReturn(this, (HomePageController.__proto__ || Object.getPrototypeOf(HomePageController)).apply(this, arguments));
    }

    _createClass(HomePageController, [{
        key: 'getPageName',
        value: function getPageName() {
            return 'home-page';
        }
    }, {
        key: 'index',
        value: function index() {
            this.view = new HomePageView({ autoRender: true, container: $('content') });
        }
    }]);

    return HomePageController;
}(PageController);

module.exports = HomePageController;
});

require.register("controllers/page-controller.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeaderView = require('./../views/header-view/header-view');
var ContentView = require('./../views/content-view');
var FooterView = require('./../views/footer-view');

var PageController = function (_Chaplin$Controller) {
    _inherits(PageController, _Chaplin$Controller);

    function PageController() {
        _classCallCheck(this, PageController);

        return _possibleConstructorReturn(this, (PageController.__proto__ || Object.getPrototypeOf(PageController)).apply(this, arguments));
    }

    _createClass(PageController, [{
        key: 'getPageName',
        value: function getPageName() {
            throw new Error('Must be implemented');
        }
    }, {
        key: 'beforeAction',
        value: function beforeAction() {
            $('body').attr('pagename', this.getPageName());
            _get(PageController.prototype.__proto__ || Object.getPrototypeOf(PageController.prototype), 'beforeAction', this).apply(arguments);
            this.reuse('header-view', HeaderView);
            this.reuse('content-view', ContentView);
            this.reuse('footer-view', FooterView);
        }
    }, {
        key: 'index',
        value: function index() {
            throw new Error('Must be implemented');
        }
    }]);

    return PageController;
}(Chaplin.Controller);

module.exports = PageController;
});

require.register("initialize.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Application = function (_Chaplin$Application) {
    _inherits(Application, _Chaplin$Application);

    function Application() {
        _classCallCheck(this, Application);

        return _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).apply(this, arguments));
    }

    _createClass(Application, [{
        key: 'initialize',
        value: function initialize(options) {
            _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'initialize', this).apply(arguments);
        }
    }, {
        key: 'initRouter',
        value: function initRouter() {
            _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'initRouter', this).apply(arguments);
        }
    }, {
        key: 'initDispatcher',
        value: function initDispatcher() {
            _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'initDispatcher', this).apply(arguments);
        }
    }, {
        key: 'initLayout',
        value: function initLayout() {
            _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'initLayout', this).apply(arguments);
        }
    }, {
        key: 'initMediator',
        value: function initMediator() {
            _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'initMediator', this).apply(arguments);
        }
    }, {
        key: 'initBackbone',
        value: function initBackbone() {
            _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'initBackbone', this).apply(arguments);
        }
    }, {
        key: 'start',
        value: function start() {
            _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'start', this).apply(arguments);
        }
    }]);

    return Application;
}(Chaplin.Application);

$(document).ready(function () {
    new Chaplin.Application({ routes: _routes2.default, controllerSuffix: '-controller' });
    return;
});
});

require.register("routes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (match) {
    match('', 'home-page#index');
};
});

;require.register("views/content-view/content-view.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = require('./../view');

module.exports = function (_View) {
    _inherits(ContentView, _View);

    function ContentView() {
        _classCallCheck(this, ContentView);

        return _possibleConstructorReturn(this, (ContentView.__proto__ || Object.getPrototypeOf(ContentView)).apply(this, arguments));
    }

    _createClass(ContentView, [{
        key: 'initialize',
        value: function initialize() {
            _get(ContentView.prototype.__proto__ || Object.getPrototypeOf(ContentView.prototype), 'initialize', this).call(this);
            this.container = $('body');
            this.noWrap = true;
        }
    }, {
        key: 'getTemplateFunction',
        value: function getTemplateFunction() {
            return require('./templates/content-view');
        }
    }]);

    return ContentView;
}(View);
});

require.register("views/content-view/index.js", function(exports, require, module) {
'use strict';

module.exports = require('./content-view');
});

require.register("views/content-view/templates/content-view.jade", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<content class=\"content\"></content>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/footer-view/footer-view.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = require('./../view');

module.exports = function (_View) {
    _inherits(FooterView, _View);

    function FooterView() {
        _classCallCheck(this, FooterView);

        return _possibleConstructorReturn(this, (FooterView.__proto__ || Object.getPrototypeOf(FooterView)).apply(this, arguments));
    }

    _createClass(FooterView, [{
        key: 'initialize',
        value: function initialize() {
            _get(FooterView.prototype.__proto__ || Object.getPrototypeOf(FooterView.prototype), 'initialize', this).call(this);
            this.container = $('body');
            this.noWrap = true;
        }
    }, {
        key: 'getTemplateFunction',
        value: function getTemplateFunction() {
            return require('./templates/footer-view');
        }
    }]);

    return FooterView;
}(View);
});

require.register("views/footer-view/index.js", function(exports, require, module) {
'use strict';

module.exports = require('./footer-view');
});

require.register("views/footer-view/templates/footer-view.jade", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<footer class=\"footer\"></footer>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/header-view/header-view.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = require('./../view');

module.exports = function (_View) {
    _inherits(HeaderView, _View);

    function HeaderView() {
        _classCallCheck(this, HeaderView);

        return _possibleConstructorReturn(this, (HeaderView.__proto__ || Object.getPrototypeOf(HeaderView)).apply(this, arguments));
    }

    _createClass(HeaderView, [{
        key: 'initialize',
        value: function initialize() {
            _get(HeaderView.prototype.__proto__ || Object.getPrototypeOf(HeaderView.prototype), 'initialize', this).call(this);
            this.container = $('body');
            this.noWrap = true;
        }
    }, {
        key: 'attach',
        value: function attach() {
            _get(HeaderView.prototype.__proto__ || Object.getPrototypeOf(HeaderView.prototype), 'attach', this).call(this);

            $(this.el).find('a.menu-item').on('click', function (event) {
                event.preventDefault();

                var $anchor = $($.attr(this, 'href'));
                if (!$anchor) return;

                $('html, body').animate({
                    scrollTop: $anchor.offset().top
                }, 500);
            });
        }
    }, {
        key: 'getTemplateFunction',
        value: function getTemplateFunction() {
            return require('./templates/header-view');
        }
    }]);

    return HeaderView;
}(View);
});

require.register("views/header-view/index.js", function(exports, require, module) {
'use strict';

module.exports = require('./header-view');
});

require.register("views/header-view/templates/header-view.jade", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<header class=\"header\"><div class=\"menu-wrapper\"><div class=\"custom-menu custom-menu-brand\"></div><div class=\"custom-menu\"><a href=\"#slide1-anchor\" class=\"menu-item\">контакти</a></div></div></header>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/home-page-view/home-page-view.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = require('./../view');

module.exports = function (_View) {
    _inherits(HomePageView, _View);

    function HomePageView() {
        _classCallCheck(this, HomePageView);

        return _possibleConstructorReturn(this, (HomePageView.__proto__ || Object.getPrototypeOf(HomePageView)).apply(this, arguments));
    }

    _createClass(HomePageView, [{
        key: 'initialize',
        value: function initialize(params) {
            _get(HomePageView.prototype.__proto__ || Object.getPrototypeOf(HomePageView.prototype), 'initialize', this).call(this, params);
            this.noWrap = true;
        }
    }, {
        key: 'getTemplateFunction',
        value: function getTemplateFunction() {
            return require('./templates/home-page-view');
        }
    }]);

    return HomePageView;
}(View);
});

require.register("views/home-page-view/index.js", function(exports, require, module) {
'use strict';

module.exports = require('./home-page-view');
});

require.register("views/home-page-view/templates/home-page-view.jade", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"home-page-content\"><div class=\"fixed-bg bg-1\"><div class=\"white-mask\"></div><div class=\"bg-container under-construction\"><div class=\"under-construction-text-block\"><img src=\"/images/izi-trade-logo.png\"/><span></span></div><h1>Ми робимо тендер простим</h1></div></div><div class=\"scrolling-bg color-1\"><a id=\"slide1-anchor\"></a><div class=\"bg-container contacts\"><h1>Тел. +380952808153</h1></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/view/index.js", function(exports, require, module) {
'use strict';

module.exports = require('./view');
});

require.register("views/view/view.js", function(exports, require, module) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (_Chaplin$View) {
  _inherits(View, _Chaplin$View);

  function View() {
    _classCallCheck(this, View);

    return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).apply(this, arguments));
  }

  return View;
}(Chaplin.View);
});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map