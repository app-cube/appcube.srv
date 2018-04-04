"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var join = require('join-path');
const _ = require("lodash");
var slash = require('slash');
exports.init_custom_routing = (appserver, config) => {
    let prefix = '/api';
    let routes = _.map(config.routes, (route) => {
        let __path = join(prefix, `/${config.name}/${route.path}`);
        let handler = route.options ? route.options.handler : route.handler;
        let route_config = {
            method: route.method,
            path: slash(__path),
            config: Object.assign({ cors: true, handler: (req) => {
                    return appserver.app.options.host.get_context_instance().exec_custom(req);
                } }, route.config)
        };
        return route_config;
    });
    return routes;
};
//# sourceMappingURL=customs.js.map