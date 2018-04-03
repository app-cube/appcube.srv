import * as Hapi from 'hapi';
import { AppServerOptions } from '../../types';
import { AppServer } from '../../lib/app';
import { config as register_sequelize } from '../sequelize';
import { config as register_routing } from '../routing';

export const register_plugins = async (server: AppServer) =>{
    return await server.register( get_plugins(server) )
}

const get_plugins = (server: AppServer) =>{

    let options:AppServerOptions = server.app.options;

    let plugings = [        
        register_sequelize,
        register_routing
    ] as any;

    return plugings
}
