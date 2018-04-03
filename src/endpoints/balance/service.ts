import { AppServer } from '../../lib/app';
import { Service } from '../../lib/service';
import * as _ from 'lodash';
import { QueryTypes } from 'sequelize';
import * as boom from 'boom';
import { Balance } from './model';

export class BalanceService extends Service<Balance> {

    addcredit = async (userId: string, amount: number) => {

        return this.post({
            userid: userId,
            balanceamount: amount
        });
    }
}