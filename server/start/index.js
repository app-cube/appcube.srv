"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appserver_1 = require("../lib/appserver");
const loader_1 = require("../plugins/sequelize/loader");
let props = {
    hosting_option: {
        host: 'localhost',
        port: 8000 // process.env.PORT as any || 8000,
    },
    path_options: {
        endpoints: '/endpoints'
    }
};
const app = new appserver_1.AppServer();
app.register_loaders(new Map([
    ['sequelize-loader', new loader_1.SequelizeLoader({
            server: app,
            options: {
                host: 'sql6003.site4now.net',
                database: 'DB_A30462_schoolzdb',
                dialect: 'mssql',
                username: 'DB_A30462_schoolzdb_admin',
                password: 'JazzTheSoul1.'
            }
        })]
]));
app.start_server();
//# sourceMappingURL=index.js.map