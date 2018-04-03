"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
exports.config = {
    name: 'balance',
    models: () => {
        return {
            'Balance': model_1.Balance
        };
    },
    routes: [
        {
            path: '/addcredit',
            method: 'post',
            options: {
                cors: true,
                handler: (req) => {
                    let server = req.app['server'];
                    return server.get_context_instance().exec_call({
                        req: req,
                        method: 'addcredit',
                        service: 'balance'
                    });
                }
            }
        }
    ]
};
//# sourceMappingURL=index.js.map