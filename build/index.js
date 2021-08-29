"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticProxy = void 0;
var utils_1 = require("@mysticaldragon/utils");
var ElasticProxy = /** @class */ (function () {
    function ElasticProxy() {
    }
    ElasticProxy.new = function (options) {
        if (options.recursive)
            return ElasticProxy.newRecursive(options);
        var opts = options;
        return new Proxy(function () { }, {
            get: function (target, prop, receiver) {
                return opts.get && opts.get(prop);
            },
            set: function (target, prop, value, receiver) {
                opts.set && opts.set(prop, value);
                return true;
            },
            apply: function (target, thisArg, args) {
                return opts.apply && opts.apply(args);
            },
            construct: function (target, args) {
                return opts.new && opts.new(args);
            }
        });
    };
    ElasticProxy.newRecursive = function (options) {
        utils_1.ObjectUtils.setDefaults(options, { path: [] });
        return ElasticProxy.new({
            recursive: false,
            get: function (prop) {
                return ElasticProxy.new({
                    recursive: true,
                    path: __spreadArray(__spreadArray([], options.path, true), [prop], false),
                    apply: options.apply,
                    new: options.new
                });
            },
            apply: function (args) {
                return options.apply && options.apply(options.path, args);
            },
            new: function (args) {
                return options.new && options.new(options.path, args);
            }
        });
    };
    return ElasticProxy;
}());
exports.ElasticProxy = ElasticProxy;
//# sourceMappingURL=index.js.map