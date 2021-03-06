"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var join = require('join-path');
exports.init_routing = (server, config) => {
    let $prefix = '/api';
    let routes = [
        {
            method: 'get',
            path: `${$prefix}/${config.name}/get/{params*}`,
            options: {
                cors: true,
                handler: (req) => {
                    return call({
                        req: req,
                        operation: 'get',
                        server: server.app.options.host,
                        service: config.name
                    });
                }
            }
        },
        {
            method: 'post',
            path: `${$prefix}/${config.name}/post`,
            options: {
                cors: true,
                handler: (req) => {
                    return call({
                        req: req,
                        operation: 'post',
                        server: server.app.options.host,
                        service: config.name
                    });
                }
            }
        },
        {
            method: 'delete',
            path: `${$prefix}/${config.name}/delete`,
            options: {
                cors: true,
                handler: (req) => {
                    return call({
                        req: req,
                        operation: 'delete',
                        server: server.app.options.host,
                        service: config.name
                    });
                }
            }
        }
    ];
    return routes;
};
const call = (props) => {
    let context = props.server.get_context_instance();
    return context.exec_call({
        operation: props.operation,
        req: props.req,
        service: props.service
    });
};
//# sourceMappingURL=crud.js.map