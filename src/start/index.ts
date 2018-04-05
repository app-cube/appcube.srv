import { AppServer } from '../lib/appserver';
import { config as sequelize_loader } from '../plugins/sequelize';
import { SequelizeLoader } from '../plugins/sequelize/loader';
import { config as routing_loader } from '../plugins/routing';

let props: any = {
    hosting_option:{
        host: process.env.PORT ? undefined : 'localhost',
        port: process.env.PORT as any || 8000,
    },
    path_options:{
        endpoints: '/endpoints'
    }
}

export const app: AppServer = new AppServer(props);

app.register_loaders(new Map<string, any>([
    ['sequelize-loader', new SequelizeLoader({ 
        server: app,
        options: {
            host: 'sql6003.site4now.net',
            database: 'DB_A30462_schoolzdb',
            dialect: 'mssql',
            username: 'DB_A30462_schoolzdb_admin',
            password: 'JazzTheSoul1.'
        }
    })]   
]));

app.start_server();