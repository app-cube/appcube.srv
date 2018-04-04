import { Table, Column, Model, ForeignKey, HasMany } from 'sequelize-typescript';
import { ServiceConfig } from '../../types';
import { AppServer } from '../../lib/app';
import { Balance } from './model';
import { Request, RouteOptions } from 'hapi';
import { BalanceService } from './service';
import * as Joi from 'joi';

export const config: ServiceConfig = {
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
            method: 'post',
            config: {
                validate: {
                    payload: {
                        userId: Joi.string().required(),
                        amount: Joi.number().required()
                    }
                }                
            }
        } as any
    ]
}