"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../mocks/server");
const sequelize_1 = require("../mocks/sequelize");
before(() => {
    exports.server = new server_1.MockAppServer({
        routes: {
            cors: true
        },
        debug: {
            request: ['info', 'debug']
        }
    });
    exports.server.register_loaders(new Map([
        ['sequelize-loader', new sequelize_1.MockSqlLoader({ server: exports.server })]
    ]));
    exports.server.init_server();
});
//# sourceMappingURL=index.js.map