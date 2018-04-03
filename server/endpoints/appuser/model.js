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
let Appuser = class Appuser extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        primaryKey: true,
        autoIncrement: false
    }),
    __metadata("design:type", String)
], Appuser.prototype, "appuserid", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false
    }),
    __metadata("design:type", String)
], Appuser.prototype, "appuseremail", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false
    }),
    __metadata("design:type", String)
], Appuser.prototype, "appusername", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false
    }),
    __metadata("design:type", String)
], Appuser.prototype, "appusersurname", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false
    }),
    __metadata("design:type", String)
], Appuser.prototype, "appusrpassword", void 0);
Appuser = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        freezeTableName: true,
        indexes: [
            {
                name: 'appuser_unq_email',
                index: 'UNIQUE',
                fields: ['appuseremail']
            }
        ]
    })
], Appuser);
exports.Appuser = Appuser;
//# sourceMappingURL=model.js.map