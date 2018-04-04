import { Table, Column, Model, ForeignKey, HasMany } from 'sequelize-typescript';
import { ServiceConfig } from '../../types';
import { AppServer } from '../../lib/app';
import { Appuser } from './model';

export const config: ServiceConfig = {
    name: 'appuser',
    models: () => {
        return {
            'Appuser': Appuser as any
        }
    }
}