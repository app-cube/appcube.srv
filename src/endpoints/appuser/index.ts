import { Table, Column, Model, ForeignKey, HasMany } from 'sequelize-typescript';
import { EndPointConfig } from '../../types';
import { AppServer } from '../../lib/app';
import { Appuser } from './model';

export const config: EndPointConfig = {
    name: 'appuser',
    models: () => {
        return {
            'Appuser': Appuser as any
        }
    }
}