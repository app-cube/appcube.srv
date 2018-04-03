import { Table, Column, Model, ForeignKey, HasMany } from 'sequelize-typescript';
import { EndPointConfig } from '../../types';
import { AppServer } from '../../lib/app';
import { Balance } from './model';
import { Request } from 'hapi';

export const config: EndPointConfig = {
    name: 'balance',
    models: () => {
        return {
            'Balance': Balance as any
        }
    },        
    routes: [
        {
            path: '/addcredit',
            method: 'post',
            options:{
                cors: true,
                handler: (req: Request) => {
                    let server: AppServer = req.app['server'];
                    return server.get_context_instance().exec_call({
                        req: req,
                        method: 'addcredit',
                        service: 'balance'
                    })
                }
            }
        }
    ]
}