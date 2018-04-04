import { Sequelize, Table, Column, HasMany, ForeignKey, CreatedAt, BelongsTo,  Model } from 'sequelize-typescript';
import { AppServerOptions,  DatabaseOptions } from '../../types';
import { AppServer } from '../../lib/app';
import * as fse from 'fs-extra';
var path = require('root-path');
var join = require('join-path');
import { ServiceConfig, ModelDefinitions } from '../../types';
import * as _ from 'lodash';

export const config = {
    name:'sequelize-connection',
    version : '1.0.0',
    register : async (server: AppServer, options) => { 

        let connection_options = server.app.options.database_options;
        const sequelize = new Sequelize( {
            ...connection_options
        });
        let models = await load_models(server, sequelize);

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
        
        server.app.options.sequelize = sequelize;
        server.app.options.models = models;
        
        return new Promise( res => res())
    }
}

const load_models = async (server:AppServer, sequelize : Sequelize): Promise<Model<any>[]> => {

    let options: AppServerOptions = server.app.options;
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

    sequelize.addModels(models);

    return new Promise(res => res(models)) as any
}
