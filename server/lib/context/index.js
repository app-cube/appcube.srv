"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('root-path');
var join = require('join-path');
const sequelize_typescript_1 = require("sequelize-typescript");
const caps = require("capitalize");
const service_1 = require("../service");
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
        this._server = server;
    }
    get server() {
        return this._server;
    }
}
exports.Context = Context;
//# sourceMappingURL=index.js.map