import { AppServer } from '../../lib/app';

import { SequelizeLoader } from './loader';

export const config = {
    name:'sequelize-connection',
    version : '1.0.0',
    register : async (app: AppServer, options) => { 
        let loader: SequelizeLoader = app.app.options.loaders ? app.app.options.loaders['sequelize-loader'] : null;
        if (!loader) {
            loader = new SequelizeLoader({server: app});
        }
        return loader.load_sequelize();
    }
}
