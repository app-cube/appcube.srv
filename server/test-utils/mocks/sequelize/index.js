"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const loader_1 = require("../../../plugins/sequelize/loader");
class MockSqlLoader extends loader_1.SequelizeLoader {
    get sequelize() {
        if (!this._sql) {
            this._sql = new sequelize_typescript_1.Sequelize({
                dialect: 'sqlite'
            });
        }
        return this._sql;
    }
}
exports.MockSqlLoader = MockSqlLoader;
//# sourceMappingURL=index.js.map