import { AppServer } from '../appserver';
import { FindOptions, DestroyOptions, Model as SqlModel } from 'sequelize';
import {Model} from 'sequelize-typescript';
import { Context } from '../context';

export class Service<T extends Model<T>> {
 
    private _resource: string
    private _context: Context

    constructor(context:Context, resource:string) {
        this._resource = resource;
        this._context = context
    }

    get resource(): string {
        return this._resource;
    }

    get context(): Context {        
        return this._context
    }

    get model(): SqlModel<T, any> {
        let model = this.context.server.app.options.sequelize.models[this.resource] as any;
        return model;
    }

    get = ( options?: FindOptions<T> ): Promise<Array<T>> => {       
        return this.model.findAll(options) as any;        
    }

    post = (values): Promise<any> => {
        return this.model.upsert(values) as any;
    }

    delete = ( options: DestroyOptions ): Promise<number> => {
        return this.model.destroy({
            ...options,
            force: true
        }) as any
    }

    describe = (): Promise<any> => {        
        return this.model.describe() as any;
    }
}