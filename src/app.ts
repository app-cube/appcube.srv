import { AppServer } from './lib/app';

let props: any = {
    hosting_options:{
        host: process.env.PORT ? undefined : 'localhost',
        port: process.env.PORT as any || 8000,
    }, 
    database_options: {
        host: 'sql6003.site4now.net',
        database: 'DB_A30462_schoolzdb',
        dialect: 'mssql',
        username: 'DB_A30462_schoolzdb_admin',
        password: 'JazzTheSoul1.'
    },
    path_options:{
        endpoints: '/endpoints'
    }
}

export const server: AppServer = new AppServer(props);

server.run();