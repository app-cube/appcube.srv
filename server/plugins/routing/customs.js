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
                    return call({
                        req: req,
                        method: route.path,
                        server: server.app.options.server,
                        service: config.name
                    });
                }
            }
        };
        return route_config;
    });
    return routes;
};
const call = (props) => {
    let context = props.server.get_context_instance();
    return context.exec_call({
        method: props.method,
        req: props.req,
        service: props.service
    });
};
//# sourceMappingURL=customs.js.map