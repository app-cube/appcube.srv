import { AppServer } from '../../lib/appserver';

import { SequelizeLoader } from './loader';

export const config = {
    name:'sequelize-connection',
    version : '1.0.0',
    register : async (appserver: AppServer, options) => { 
        
        let loader: SequelizeLoader = appserver.app.options.loaders ? appserver.app.options.loaders.get('sequelize-loader') : null;
        
        if (!loader) {
            loader = new SequelizeLoader({
                server: appserver,
                options: {
                    dialect: 'sqlite'
                } as any
            });
        }
        
        return loader.load_sequelize();
    }
}
