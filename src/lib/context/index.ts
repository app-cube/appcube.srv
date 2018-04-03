import { AppServer } from '../app';
var path = require('root-path');
var join = require('join-path');
import { AppServerOptions, EndPointConfig } from '../../types';
import * as fse from 'fs-extra';
import { Sequelize } from 'sequelize-typescript';
import * as caps from 'capitalize';
import { Service } from '../service';

export class Context {

    private _server: AppServer;
    constructor(server: AppServer) {
        this._server = server;
    }


    get server(): AppServer {
        return this._server;
    }

    open_connection = () => {
        let connection_options: any = this.server.app.options.database_options;
        connection_options.define = {
            freezeTableName: true,
            hooks: { 
                beforeBulkUpdate: function(options) {
                    options.individualHooks = true;
                }
            }
        }
        let sequelize = new Sequelize(connection_options);
        sequelize.addModels( this.server.app.options.models );
        return sequelize;
    }

    get_service_instance = (name: string): Service<any> => {
        
        let options: AppServerOptions = this.server.app.options;

        let dir = path(join('/server/', options.path_options.endpoints));
        let config_file_path = join(dir, name);
        let endpoint :{
            config: EndPointConfig
        } = require(config_file_path);

        let service:Service<any> = null;

        if (endpoint.config.getservice) {
            service = endpoint.config.getservice(this);
        } else {
            service = new Service(this, caps(name));
        }

        return service;
    }
}
