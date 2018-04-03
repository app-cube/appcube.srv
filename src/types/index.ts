import { ServerRoute } from 'hapi';
import { Model, Sequelize } from 'sequelize-typescript';

export interface DatabaseOptions {
    database: string,
    dialect: string,
    username: string,
    password: string,
    host?: string
}

export interface AppServerOptions {
    
    hosting_options :{
        host: string,
        port: string,
    },
    
    path_options :{
        endpoints: string
    },

    database_options: DatabaseOptions,
    sequelize?: Sequelize,
    server?: any, //AppServer,
    models?: any[]
}

export interface ModelDefinitions {
    [name: string] : Model<any>
}

type GetModels = () => ModelDefinitions;
export enum RouteType  { api, custom}

export interface RouteConfig extends ServerRoute {
    type?: RouteType
}

export interface EndPointConfig {
    name: string,
    models?: ModelDefinitions  | GetModels,
    routes?: Array<RouteConfig>,
    getservice? : (context: any) => any
}

export interface AppInternalSettings {
    options: AppServerOptions
}