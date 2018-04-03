import { Table, Column, Model, ForeignKey, HasMany } from 'sequelize-typescript';
import { EndPointConfig } from '../../types';
import { AppServer } from '../../lib/app';
import { Balance } from './model';

export const config: EndPointConfig = {
    name: 'balance',
    models: () => {
        return {
            'Balance': Balance as any
        }
    }
}