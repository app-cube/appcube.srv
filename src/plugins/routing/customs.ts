import { AppServer } from '../../lib/app';
import { Context } from '../../lib/context';
import { EndPointConfig } from '../../types';
var join = require('join-path');
import { ServerRoute, Request } from 'hapi';
import * as _ from 'lodash';
var slash = require('slash');

export const init_custom_routing = (server: AppServer, config: EndPointConfig) => {

    let prefix = '/api';

    let routes = _.map(config.routes, (route: any) => {

        let __path = join(prefix, `/${config.name}/${route.path}`);

        let route_config = {
            method: route.method,
            path: slash(__path),
            config: {
                cors: true,
                handler: ( req: Request ) => {                                        
                    return call({
                        req: req,
                        method: route.path,
                        server: server.app.options.server,
                        service: config.name
                    })
                }
            }
        };

        return route_config;
    });

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