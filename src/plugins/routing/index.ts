import * as Hapi from 'hapi';
import { Request} from 'hapi';
import { AppServer } from '../../lib/app';
import { AppServerOptions } from '../../types';
import { EndPointConfig } from '../../types';
import * as fse from 'fs-extra';
var path = require('root-path');
var join = require('join-path');
import { init_routing } from './crud';
import { init_custom_routing } from './customs';

export const config = {
    name: 'routing',
    version : '1.0.0',
    register : (server, options) => {
        return load_routes(server);
    }
}

const load_routes = async (server: AppServer) => {
    let options: AppServerOptions = server.app.options;
    let dir = path(join('/server/', options.path_options.endpoints));
    let config_files = await fse.readdir(dir);

    for(var f in config_files) {

        let config_path = join(dir,`/${config_files[f]}`);

        let endpoint_config:{
            config: EndPointConfig
        } = require(config_path);

        let routes: any = [
            ...init_routing(server, endpoint_config.config),
            ...init_custom_routing(server, endpoint_config.config)
        ];

        server.route(routes);
    }

    return new Promise( done => {
        done();
    })
}