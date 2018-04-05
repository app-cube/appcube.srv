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
const chai = require("chai");
const expect = chai.expect;
const app_1 = require("../../lib/app");
describe('Routing', () => {
    it("'get' route should work  ", () => __awaiter(this, void 0, void 0, function* () {
        let srv = new app_1.AppServer({
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
        });
        yield srv.init_server();
        let res = yield srv.inject('/api/appuser/get');
        expect(JSON.parse(res.payload).length).to.be.gt(0);
    }));
});
//# sourceMappingURL=crud.test.js.map