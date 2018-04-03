"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let Balance = class Balance extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        primaryKey: true,
        autoIncrement: false
    }),
    __metadata("design:type", String)
], Balance.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false
    }),
    __metadata("design:type", String)
], Balance.prototype, "userid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false,
        type: sequelize_typescript_1.DataType.DOUBLE
    }),
    __metadata("design:type", Number)
], Balance.prototype, "balanceamount", void 0);
Balance = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        freezeTableName: true
    })
], Balance);
exports.Balance = Balance;
//# sourceMappingURL=model.js.map