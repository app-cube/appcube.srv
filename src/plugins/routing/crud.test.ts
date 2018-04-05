import * as chai from 'chai';
const expect = chai.expect;
import { AppServer } from '../../lib/appserver';
import { ServerInjectResponse } from 'hapi';

describe('Routing', ()=> {

    it('get route should work', async ()=> {
        
        let server = new AppServer();

        let res = await server.inject('/api/appuser/get');
        
        expect( JSON.parse(res.payload).length).to.be.gt(0);
    })
})

