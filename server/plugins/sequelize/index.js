"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as fse from 'fs-extra';
// var path = require('root-path');
// var join = require('join-path');
// import { ServiceConfig, ModelDefinitions } from '../../types';
// import * as _ from 'lodash';
const loader_1 = require("./loader");
exports.config = {
    name: 'sequelize-connection',
    version: '1.0.0',
    register: (app, options) => __awaiter(this, void 0, void 0, function* () {
        let loader = app.app.options.loaders ? app.app.options.loaders['sequelize-loader'] : null;
        if (!loader) {
            loader = new loader_1.SequelizeLoader({ server: app });
        }
        return loader.load_sequelize();
        // let connection_options = server.app.options.database_options;
        // const sequelize = new Sequelize( {
        //     // ...connection_options
        //     dialect: 'sqlite'
        // } as any);
        // let models = await load_models(server, sequelize);
        // for(var i in models) {
        //     let model: Model<any> = models[i];
        //     try{
        //         await model['sync']({
        //             force: false,
        //             alter: true
        //         })
        //     }catch(err) {
        //         // ignore
        //         if (err) {
        //             console.error(err);
        //         }
        //     }
        // }
        // server.app.options.sequelize = sequelize;
        // server.app.options.models = models;
        // return new Promise( res => res())
    })
};
// const load_models = async (server:AppServer, sequelize : Sequelize): Promise<Model<any>[]> => {
//     let options: AppServerOptions = server.app.options;
//     let dir = path(join('/server/', options.path_options.endpoints));
//     let files = await fse.readdir(dir);
//     let models = [];
//     for(var i in files) {
//         let config_path = join(dir, `/${files[i]}`);
//         let endpoint:{
//             config: ServiceConfig
//         } = require(config_path);
//         let modelDefs = endpoint.config.models;
//         if( _.isFunction(endpoint.config.models)) {
//             modelDefs = endpoint.config.models();
//         }   
//         if( modelDefs) {
//             for(var model_name in modelDefs ) {
//                 models = [
//                     ...models,
//                     modelDefs[model_name]
//                 ]
//             }
//         }
//     }
//     sequelize.addModels(models);
//     return new Promise(res => res(models)) as any
// }
//# sourceMappingURL=index.js.map