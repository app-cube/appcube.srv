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
    let service = context.get_service_instance(props.service);

    try{
        return call_fn(service[props.method], service, props.req).then(res => {
            return res;
        }, err => {
            return handle_error(err);
        })
    } catch (err) {
        return handle_error(err);
    }
}

const call_fn = ( func: Function, owner, args) => {
    return func.call(owner, args);
}

const handle_error = err => {

    let error = null;

    if (typeof err === 'string' || err instanceof String ) {
        error = err;
    } else {
        error = JSON.stringify(err);
    }

    let boomed = boom.badRequest(error);

    boomed.output.payload.message = error;

    return boomed;

}