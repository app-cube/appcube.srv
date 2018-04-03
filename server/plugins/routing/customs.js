"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var join = require('join-path');
const _ = require("lodash");
var slash = require('slash');
exports.init_custom_routing = (server, config) => {
    let prefix = '/api';
    let routes = _.map(config.routes, (route) => {
        let __path = join(prefix, `/${config.name}/${route.path}`);
        let route_config = {
            method: route.method,
            path: slash(__path),
            config: {
                cors: true,
                handler: (req) => {
                    req.app['server'] = server.app.options.server;
                    return route.config['handler'](req);
                }
            }
        };
        return route_config;
    });
    return routes;
};
//# sourceMappingURL=customs.js.map