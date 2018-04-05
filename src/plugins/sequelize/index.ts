import { AppServer } from '../../lib/appserver';

import { SequelizeLoader } from './loader';

export const config = {
    name:'sequelize-connection',
    version : '1.0.0',
    register : async (app: AppServer, options) => { 
        
        let loader: SequelizeLoader = app.app.options.loaders ? app.app.options.loaders.get('sequelize-loader') : null;
        
        if (!loader) {
            loader = new SequelizeLoader({
                server: app,
                options: {
                    dialect: 'sqlite'
                } as any
            });
        }
        
        return loader.load_sequelize();
    }
}
