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
const service_1 = require("../../lib/service");
const uuid = require('uuid/v4');
class BalanceService extends service_1.Service {
    constructor() {
        super(...arguments);
        this.addcredit = (userId, amount) => __awaiter(this, void 0, void 0, function* () {
            let list = yield this.get({
                where: {
                    userid: userId
                }
            });
            let bal = list.length > 0 ? list[0] : null;
            if (!bal) {
                bal = {
                    id: uuid(),
                    userid: userId,
                    balanceamount: amount ? amount : 0
                };
            }
            else {
                bal = Object.assign({}, bal, { balanceamount: bal.balanceamount + amount });
                bal = bal.dataValues;
            }
            return this.post(bal);
        });
    }
}
exports.BalanceService = BalanceService;
//# sourceMappingURL=service.js.map