import { AppServer } from '../../lib/app';
import { EndPointConfig } from '../../types';
var join = require('join-path');
import { Request } from 'hapi';
import * as boom from 'boom';

export const init_crud_routing = (server: AppServer, config: EndPointConfig) => {

    let $prefix = '/api';

    let routes = [
        {
            method: 'get',
            path: `${$prefix}/${config.name}/get/{params*}`,
            options: {
                cors: true,
                handler: (req: Request) => {
                    return new Promise(ok => {
                        ok('get successful')
                    })
                }
            }
        },
        {
            method: 'post',
            path: `${$prefix}/${config.name}/post`,
            options: {
                cors: true,
                handler: (req: Request) => {
                    return new Promise(ok => {
                        ok('post successful')
                    })
                }
            }
        },
        {
            method: 'delete',
            path: `${$prefix}/${config.name}/delete`,
            options: {
                cors: true,
                handler: (req: Request) => {
                    return new Promise(ok => {
                        ok('delete successful')
                    })
                }
            }
        }
    ]

    return routes;
}