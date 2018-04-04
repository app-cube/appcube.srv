import { AppServer } from '../../lib/app';
import { Context } from '../../lib/context';
import { ServiceConfig } from '../../types';
var join = require('join-path');
import { ServerRoute, Request } from 'hapi';
import * as _ from 'lodash';
var slash = require('slash');

export const init_custom_routing = (appserver: AppServer, config: ServiceConfig) => {

    let prefix = '/api';

    let routes = _.map(config.routes, (route: any) => {

        let __path = join(prefix, `/${config.name}/${route.path}`);

        let handler = route.options ? route.options.handler : route.handler;

        let route_config = {
            method: route.method,
            path: slash(__path),
            config: {
                cors: true,
                handler: ( req: Request ) => {
                    return appserver.app.options.host.get_context_instance().exec_custom(req);
                },
                ...route.config
            }
        };
        return route_config;
    });
    return routes;
}
