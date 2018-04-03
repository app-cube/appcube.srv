"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var join = require('join-path');
const boom = require("boom");
exports.init_crud_routing = (server, config) => {
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
                        method: 'get',
                        server: server.app.options.server,
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
                        method: 'post',
                        server: server.app.options.server,
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
                        method: 'delete',
                        server: server.app.options.server,
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
    let service = context.get_service_instance(props.service);
    try {
        return call_fn(service[props.method], service, props.req).then(res => {
            return res;
        }, err => {
            return handle_error(err);
        });
    }
    catch (err) {
        return handle_error(err);
    }
};
const call_fn = (func, owner, args) => {
    return func.call(owner, args);
};
const handle_error = err => {
    let error = null;
    if (typeof err === 'string' || err instanceof String) {
        error = err;
    }
    else {
        error = JSON.stringify(err);
    }
    let boomed = boom.badRequest(error);
    boomed.output.payload.message = error;
    return boomed;
};
//# sourceMappingURL=crud.js.map