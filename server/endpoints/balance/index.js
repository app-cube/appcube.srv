"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const service_1 = require("./service");
const Joi = require("joi");
exports.config = {
    name: 'balance',
    models: () => {
        return {
            'Balance': model_1.Balance
        };
    },
    getservice: (ctx) => {
        return new service_1.BalanceService(ctx, 'Balance');
    },
    routes: [
        {
            path: 'addcredit',
            method: 'post',
            config: {
                validate: {
                    payload: {
                        userId: Joi.string().required(),
                        amount: Joi.number().required()
                    }
                }
            }
        }
    ]
};
//# sourceMappingURL=index.js.map