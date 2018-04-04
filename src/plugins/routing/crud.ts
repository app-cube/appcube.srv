import { AppServer } from '../../lib/app';
import { ServiceConfig } from '../../types';
var join = require('join-path');
import { Request } from 'hapi';

export const init_routing = (server: AppServer, config: ServiceConfig) => {

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
                        operation: 'get',
                        server: server.app.options.host,
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
                        operation: 'post',
                        server: server.app.options.host,
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
                        operation: 'delete',
                        server: server.app.options.host,
                        service: config.name
                    })
                }
            }
        }
    ]

    return routes;
}

interface Props {
    req: Request, server:AppServer, service: string, operation: string,
}

const call = (props: Props) => {
    let context = props.server.get_context_instance();
    return context.exec_call({
        operation: props.operation,
        req: props.req,
        service: props.service
    })
}
