"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('root-path');
var join = require('join-path');
const sequelize_typescript_1 = require("sequelize-typescript");
const caps = require("capitalize");
const service_1 = require("../service");
const boom = require("boom");
class Context {
    constructor(server) {
        this.open_connection = () => {
            let connection_options = this.server.app.options.database_options;
            connection_options.define = {
                freezeTableName: true,
                hooks: {
                    beforeBulkUpdate: function (options) {
                        options.individualHooks = true;
                    }
                }
            };
            let sequelize = new sequelize_typescript_1.Sequelize(connection_options);
            sequelize.addModels(this.server.app.options.models);
            return sequelize;
        };
        this.get_service_instance = (name) => {
            let options = this.server.app.options;
            let dir = path(join('/server/', options.path_options.endpoints));
            let config_file_path = join(dir, name);
            let endpoint = require(config_file_path);
            let service = null;
            if (endpoint.config.getservice) {
                service = endpoint.config.getservice(this);
            }
            else {
                service = new service_1.Service(this, caps(name));
            }
            return service;
        };
        this.exec_call = (props) => {
            let service = this.get_service_instance(props.service);
            try {
                return this.call_fn(service[props.method], service, props.req).then(res => {
                    return res;
                }, err => {
                    return this.handle_error(err);
                });
            }
            catch (e) {
                return this.handle_error(e);
            }
        };
        this.call_fn = (func, owner, args) => {
            return func.call(owner, args);
        };
        this.handle_error = err => {
            let error = null;
            if (typeof err === 'string' || err instanceof String) {
                error = err;
            }
            else {
                error = JSON.stringify(err);
            }
            let boomed = boom.badRequest(error);
            boomed.output.payload.message = error;
            return boomed;
        };
        this._server = server;
    }
    get server() {
        return this._server;
    }
}
exports.Context = Context;
//# sourceMappingURL=index.js.map