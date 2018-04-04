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
const sequelize_typescript_1 = require("sequelize-typescript");
const fse = require("fs-extra");
var path = require('root-path');
var join = require('join-path');
const _ = require("lodash");
exports.config = {
    name: 'sequelize-connection',
    version: '1.0.0',
    register: (server, options) => __awaiter(this, void 0, void 0, function* () {
        let connection_options = server.app.options.database_options;
        const sequelize = new sequelize_typescript_1.Sequelize(Object.assign({}, connection_options));
        let models = yield load_models(server, sequelize);
        for (var i in models) {
            let model = models[i];
            try {
                yield model['sync']({
                    force: false,
                    alter: true
                });
            }
            catch (err) {
                // ignore
                if (err) {
                    console.error(err);
                }
            }
        }
        server.app.options.sequelize = sequelize;
        server.app.options.models = models;
        return new Promise(res => res());
    })
};
const load_models = (server, sequelize) => __awaiter(this, void 0, void 0, function* () {
    let options = server.app.options;
    let dir = path(join('/server/', options.path_options.endpoints));
    let files = yield fse.readdir(dir);
    let models = [];
    for (var i in files) {
        let config_path = join(dir, `/${files[i]}`);
        let endpoint = require(config_path);
        let modelDefs = endpoint.config.models;
        if (_.isFunction(endpoint.config.models)) {
            modelDefs = endpoint.config.models();
        }
        if (modelDefs) {
            for (var model_name in modelDefs) {
                models = [
                    ...models,
                    modelDefs[model_name]
                ];
            }
        }
    }
    sequelize.addModels(models);
    return new Promise(res => res(models));
});
//# sourceMappingURL=index.js.map