import { AppServer } from '../app';
var path = require('root-path');
var join = require('join-path');
import { AppServerOptions, ServiceConfig } from '../../types';
import * as fse from 'fs-extra';
import { Sequelize } from 'sequelize-typescript';
import * as caps from 'capitalize';
import { Service } from '../service';
import { Request } from 'hapi';
import * as boom from 'boom';
import * as _ from 'lodash';

export class Context {

    private _server: AppServer;
    constructor(server: AppServer) {
        this._server = server;
    }


    get server(): AppServer {
        return this._server;
    }

    open_connection = () => {
        let connection_options: any = this.server.app.options.database_options;
        connection_options.define = {
            freezeTableName: true,
            hooks: { 
                beforeBulkUpdate: function(options) {
                    options.individualHooks = true;
                }
            }
        }
        let sequelize = new Sequelize(connection_options);
        sequelize.addModels( this.server.app.options.models );
        return sequelize;
    }

    get_service_instance = (name: string): Service<any> => {

        let options: AppServerOptions = this.server.app.options;

        let dir = path(join('/server/', options.path_options.endpoints));
        let config_file_path = join(dir, name);
        let endpoint :{
            config: ServiceConfig
        } = require(config_file_path);

        let service:Service<any> = null;

        if (endpoint.config.getservice) {
            service = endpoint.config.getservice(this);
        } else {
            service = new Service(this, caps(name));
        }

        return service;
    }

    exec_custom = (req: Request) => {
        let srv_name = this.get_srv_name(req);
        let oper_name = this.get_operation_name(req);
        return this.exec_call({
            req: req,
            service: srv_name,
            operation: oper_name
        });
    }

    private get_srv_name = (req: Request) => {
        let path: string[] = req.path.split('/');        
        return path[ path.indexOf('api') + 1];
    }

    private get_operation_name = (req: Request) => {
        let path: string[] = req.path.split('/');
        return path[ path.indexOf('api') + 2];
    }

    exec_call = (props:{
        req: Request, service: string, operation: string
    }) => {

        let srv = this.get_service_instance(props.service);

        try {
            
            let args = this.get_args(props.req);
            
            return this.call_fn(srv[props.operation], srv, args).then( res => {
                return res;                
            }, err => {
                return this.handle_error(err);
            })

        } catch (e) {
            return this.handle_error(e);
        }

    }

    private call_fn = ( func: Function, owner, args) => {
        return func.apply(owner, args);
    }

    private get_args = (req: Request) => {
        if (req.method) {
            let args = null;            
            if ( ( _.findIndex(['post', 'put', 'delete'], req.method.toLowerCase())) && req.payload ) {
                args = req.payload;
            }
            if (req.method.toLowerCase() === 'get' && req.query) {
                args = req.query;
            }
            if (args) {
                let params = _.map(Object.keys(args), k => {
                    return args[k];
                });
                return params;
            }
        }
        return null;
    }
    
    private handle_error = err => {
    
        let error = null;
    
        if (typeof err === 'string' || err instanceof String ) {
            error = err;
        } else {

            if (err.message) {
                error = err.message
            } else {
                error = JSON.stringify(err);
            }
        }
    
        let boomed = boom.badRequest(error);
    
        boomed.output.payload.message = error;
    
        return boomed;
    
    }
}

export const Static = {
    exec: () => {

    }
}
