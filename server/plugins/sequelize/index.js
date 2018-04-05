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
const loader_1 = require("./loader");
exports.config = {
    name: 'sequelize-connection',
    version: '1.0.0',
    register: (appserver, options) => __awaiter(this, void 0, void 0, function* () {
        let loader = appserver.app.options.loaders ? appserver.app.options.loaders.get('sequelize-loader') : null;
        if (!loader) {
            loader = new loader_1.SequelizeLoader({
                server: appserver,
                options: {
                    dialect: 'sqlite'
                }
            });
        }
        return loader.load_sequelize();
    })
};
//# sourceMappingURL=index.js.map