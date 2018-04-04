"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Service {
    constructor(context, resource) {
        this.get = (options) => {
            return this.model.findAll(options);
        };
        this.post = (values) => {
            return this.model.upsert(values);
        };
        this.delete = (options) => {
            return this.model.destroy(Object.assign({}, options, { force: true }));
        };
        this.describe = () => {
            return this.model.describe();
        };
        this._resource = resource;
        this._context = context;
    }
    get resource() {
        return this._resource;
    }
    get context() {
        return this._context;
    }
    get model() {
        let model = this.context.server.app.options.sequelize.models[this.resource];
        return model;
    }
}
exports.Service = Service;
//# sourceMappingURL=index.js.map