"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./lib/app");
let props = {
    hosting_options: {
        host: process.env.PORT ? undefined : 'localhost',
        port: process.env.PORT || 8000,
    },
    database_options: {
        host: 'sql6003.site4now.net',
        database: 'DB_A30462_schoolzdb',
        dialect: 'mssql',
        username: 'DB_A30462_schoolzdb_admin',
        password: 'JazzTheSoul1.'
    },
    path_options: {
        endpoints: '/endpoints'
    }
};
exports.app = new app_1.AppServer(props);
// app.register_loaders(new Map<string, any>([
//     ['sequelize-loader', new SequelizeLoader({ server: app })]   
// ]));
exports.app.start_server();
//# sourceMappingURL=app.js.map