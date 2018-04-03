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
const sequelize_1 = require("../sequelize");
const routing_1 = require("../routing");
exports.register_plugins = (server) => __awaiter(this, void 0, void 0, function* () {
    return yield server.register(get_plugins(server));
});
const get_plugins = (server) => {
    let options = server.app.options;
    let plugings = [
        sequelize_1.config,
        routing_1.config
    ];
    return plugings;
};
//# sourceMappingURL=index.js.map