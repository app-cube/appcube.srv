import { Sequelize, Model } from 'sequelize-typescript';
import { AppServer } from '../../lib/app';
import { AppServerOptions,  DatabaseOptions } from '../../types';
import { ServiceConfig, ModelDefinitions } from '../../types';
import * as fse from 'fs-extra';
var path = require('root-path');
var join = require('join-path');
import * as _ from 'lodash';

export class SequelizeLoader {

    constructor(props:{
        server: AppServer
    }) {
        this._server = props.server
    }

    private _server: AppServer;
    private _sequelize: Sequelize;

    get server(): AppServer {
        return this._server;
    }

    get sequelize(): Sequelize {        
        if (!this._sequelize) {
            this._sequelize = new Sequelize({
                ...this.server.app.options.database_options
            })
        }
        return this._sequelize;
    }

    load_sequelize = async () => {
        let models = await this.loadmodels();
        for(var i in models) {

            let model: Model<any> = models[i];

            try{
                await model['sync']({
                    force: false,
                    alter: true
                })
            }catch(err) {
                // ignore
                if (err) {
                    console.error(err);
                }
            }
        }

        this.server.app.options.sequelize = this.sequelize;
        this.server.app.options.models = models;
        return Promise.resolve();
    }

    loadmodels = async (): Promise<Model<any>[]> => {
        let options: AppServerOptions = this.server.app.options;
        let dir = path(join('/server/', options.path_options.endpoints));
        let files = await fse.readdir(dir);
        let models = [];

        for(var i in files) {
            let config_path = join(dir, `/${files[i]}`);
            let endpoint:{
                config: ServiceConfig
            } = require(config_path);
    
            let modelDefs = endpoint.config.models;
    
            if( _.isFunction(endpoint.config.models)) {
                modelDefs = endpoint.config.models();
            }   
    
            if( modelDefs) {
    
                for(var model_name in modelDefs ) {
                    models = [
                        ...models,
                        modelDefs[model_name]
                    ]
                }
            }
        }    
        this.sequelize.addModels(models);    
        return Promise.resolve(models);
    }
}

