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
const hapi_1 = require("hapi");
const registration_1 = require("../../plugins/registration");
const context_1 = require("../context");
class AppServer extends hapi_1.Server {
    constructor() {
        super({
            host: 'localhost',
            port: 8000,
            routes: {
                cors: true
            },
            debug: {
                request: ['info', 'debug']
            }
        });
        this.init_server = () => __awaiter(this, void 0, void 0, function* () {
            this.app.options.host = this;
            return registration_1.register_plugins(this);
        });
        this.register_loaders = (loaders) => __awaiter(this, void 0, void 0, function* () {
            this.app.options.loaders = loaders;
        });
        this.start_server = (loaders) => __awaiter(this, void 0, void 0, function* () {
            yield this.init_server();
            try {
                yield this.start();
                console.log('server running at: ' + this.info.uri);
            }
            catch (e) {
                console.log('Could not start server. Error: ' + JSON.stringify(e));
            }
        });
        this.get_context_instance = () => {
            return new context_1.Context(this);
        };
        this.get_service_instance = (name, context) => {
            let ctx = context ? context : this.get_context_instance();
        };
        this.app.options = {};
    }
}
exports.AppServer = AppServer;
//# sourceMappingURL=index.js.map