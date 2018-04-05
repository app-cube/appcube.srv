import * as chai from 'chai';
const expect = chai.expect;
import { AppServer } from '../../lib/app';
import { ServerInjectResponse } from 'hapi';

describe('Routing', ()=> {

    it("'get' route should work  ", async ()=> {
        let srv = new AppServer({
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
        });
        await srv.init_server();
        let res: ServerInjectResponse = await srv.inject('/api/appuser/get');        
        expect( JSON.parse(res.payload).length).to.be.gt(0);
    })
})

