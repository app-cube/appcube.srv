"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('root-path');
var join = require('join-path');
const sequelize_typescript_1 = require("sequelize-typescript");
const caps = require("capitalize");
const service_1 = require("../service");
const boom = require("boom");
const _ = require("lodash");
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
        this.exec_custom = (req) => {
            let srv_name = this.get_srv_name(req);
            let oper_name = this.get_operation_name(req);
            return this.exec_call({
                req: req,
                service: srv_name,
                operation: oper_name
            });
        };
        this.get_srv_name = (req) => {
            let path = req.path.split('/');
            return path[path.indexOf('api') + 1];
        };
        this.get_operation_name = (req) => {
            let path = req.path.split('/');
            return path[path.indexOf('api') + 2];
        };
        this.exec_call = (props) => {
            let srv = this.get_service_instance(props.service);
            try {
                let args = this.get_args(props.req);
                return this.call_fn(srv[props.operation], srv, args).then(res => {
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
            return func.apply(owner, args);
        };
        this.get_args = (req) => {
            if (req.method) {
                let args = null;
                if ((_.findIndex(['post', 'put', 'delete'], req.method.toLowerCase())) && req.payload) {
                    args = req.payload;
                }
                if (req.method.toLowerCase() === 'get' && req.query) {
                    args = req.query;
                }
                if (args) {
                    let params = _.map(Object.keys(args), k => {
                        return args[k];
                    });
                    return params;
                }
            }
            return null;
        };
        this.handle_error = err => {
            let error = null;
            if (typeof err === 'string' || err instanceof String) {
                error = err;
            }
            else {
                if (err.message) {
                    error = err.message;
                }
                else {
                    error = JSON.stringify(err);
                }
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
exports.Static = {
    exec: () => {
    }
};
//# sourceMappingURL=index.js.map