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
const appserver_1 = require("../../lib/appserver");
describe('Routing', () => {
    it('get route should work', () => __awaiter(this, void 0, void 0, function* () {
        let server = new appserver_1.AppServer({
            path_options: {
                endpoints: '/endpoints'
            }
        });
        let res = yield server.inject('/api/appuser/get');
        expect(JSON.parse(res.payload).length).to.be.gt(0);
    }));
});
//# sourceMappingURL=crud.test.js.map