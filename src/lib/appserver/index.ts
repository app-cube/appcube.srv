import { Server } from 'hapi';
import { AppServerOptions, AppInternalSettings} from '../../types';
import { register_plugins } from '../../plugins/registration';
import { Context } from '../context';
import * as _ from 'lodash';

export class AppServer extends Server {

    constructor(props: AppServerOptions) {
        super({
            ...props.hosting_options,
            routes: {
                cors: true
            },
            debug: {
                request: ['info', 'debug']
            }
        } as any);
        this.app.options = props;
    }

    app: AppInternalSettings;

    init_server = async () => {
        this.app.options.host = this;
        return register_plugins(this);
    }

    register_loaders = async (loaders: Map<string, any>) => {    
        this.app.options.loaders = loaders;               
    }

    start_server = async (loaders?: Map<string, any>) => {
        await this.init_server();
        try {
            await this.start();
            console.log('server running at: ' + this.info.uri);
        } catch (e) {
            console.log('Could not start server. Error: ' + JSON.stringify(e));
        }
    }

    get_context_instance = () => {
        return new Context(this);
    }

    get_service_instance = (name: string, context?: Context) => {
        let ctx = context ? context: this.get_context_instance();        
    }
}