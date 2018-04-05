"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appserver_1 = require("../lib/appserver");
const loader_1 = require("../plugins/sequelize/loader");
let props = {
    hosting_option: {
        host: process.env.PORT ? undefined : 'localhost',
        port: process.env.PORT || 8000,
    },
    path_options: {
        endpoints: '/endpoints'
    }
};
exports.app = new appserver_1.AppServer(props);
exports.app.register_loaders(new Map([
    ['sequelize-loader', new loader_1.SequelizeLoader({
            server: exports.app,
            options: {
                host: 'sql6003.site4now.net',
                database: 'DB_A30462_schoolzdb',
                dialect: 'mssql',
                username: 'DB_A30462_schoolzdb_admin',
                password: 'JazzTheSoul1.'
            }
        })]
]));
exports.app.start_server();
//# sourceMappingURL=index.js.map