"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var join = require('join-path');
exports.init_crud_routing = (server, config) => {
    let $prefix = '/api';
    let routes = [
        {
            method: 'get',
            path: `${$prefix}/${config.name}/get/{params*}`,
            options: {
                cors: true,
                handler: (req) => {
                    return new Promise(ok => {
                        ok('get successful');
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
                    return new Promise(ok => {
                        ok('post successful');
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
                    return new Promise(ok => {
                        ok('delete successful');
                    });
                }
            }
        }
    ];
    return routes;
};
//# sourceMappingURL=crud.js.map