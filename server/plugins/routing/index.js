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
const fse = require("fs-extra");
var path = require('root-path');
var join = require('join-path');
const crud_1 = require("./crud");
const customs_1 = require("./customs");
exports.config = {
    name: 'routing',
    version: '1.0.0',
    register: (server, options) => {
        return load_routes(server);
    }
};
const load_routes = (server) => __awaiter(this, void 0, void 0, function* () {
    let options = server.app.options;
    let dir = path(join('/server/', options.path_options.endpoints));
    let config_files = yield fse.readdir(dir);
    for (var f in config_files) {
        let config_path = join(dir, `/${config_files[f]}`);
        let endpoint_config = require(config_path);
        let routes = [
            ...crud_1.init_routing(server, endpoint_config.config),
            ...customs_1.init_custom_routing(server, endpoint_config.config)
        ];
        server.route(routes);
    }
    return new Promise(done => {
        done();
    });
});
//# sourceMappingURL=index.js.map