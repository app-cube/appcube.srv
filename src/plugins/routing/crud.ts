import { AppServer } from '../../lib/app';
import { EndPointConfig } from '../../types';
var join = require('join-path');
import { Request } from 'hapi';

export const init_crud_routing = (server: AppServer, config: EndPointConfig) => {

    let $prefix = '/api';

    let routes = [
        {
            method: 'get',
            path: `${$prefix}/${config.name}/get/{params*}`,
            options: {
                cors: true,
                handler: (req: Request) => {
                    return call({
                        req: req,
                        method: 'get',
                        server: server.app.options.server,
                        service: config.name
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
                    return call({
                        req: req,
                        method: 'post',
                        server: server.app.options.server,
                        service: config.name
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
                    return call({
                        req: req,
                        method: 'delete',
                        server: server.app.options.server,
                        service: config.name
                    })
                }
            }
        }
    ]

    return routes;
}

interface Props {
    req: Request, server:AppServer, service: string, method: string,
}

const call = (props: Props) => {
    let context = props.server.get_context_instance();
    return context.exec_call({
        method: props.method,
        req: props.req,
        service: props.service
    })
}
