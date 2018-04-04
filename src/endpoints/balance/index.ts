import { Table, Column, Model, ForeignKey, HasMany } from 'sequelize-typescript';
import { EndPointConfig } from '../../types';
import { AppServer } from '../../lib/app';
import { Balance } from './model';
import { Request } from 'hapi';
import { BalanceService } from './service';

export const config: EndPointConfig = {
    name: 'balance',
    models: () => {
        return {
            'Balance': Balance as any
        }
    },   
    getservice: (ctx: any) => {
        return new BalanceService(ctx, 'Balance');
    },  
    routes: [
        {
            path: 'addcredit',
            method: 'post'
        }
    ]
}