import { AppServer } from '../../lib/appserver';
import { Service } from '../../lib/service';
import * as _ from 'lodash';
import { QueryTypes } from 'sequelize';
import * as boom from 'boom';
import { Balance } from './model';
const uuid = require('uuid/v4');

export class BalanceService extends Service<Balance> {

    addcredit = async (userId: string, amount: number) => {

        let list = await this.get({
            where: {
                userid: userId
            }
        });

        let bal: Balance = list.length > 0 ? list[0] : null;

        if (!bal) {            
            bal = {
                id: uuid(),
                userid: userId,
                balanceamount: amount ? amount : 0
            } as any            
        } else {    
            bal.balanceamount += amount;            
        }

        return this.post(bal.get({ plain: true }))
    }
}