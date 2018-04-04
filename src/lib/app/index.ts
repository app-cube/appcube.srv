import { Server } from 'hapi';
import { AppServerOptions, AppInternalSettings} from '../../types';
import { register_plugins } from '../../plugins/registration';
import { Context } from '../context';

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

    run = async () => {

        this.app.options.host = this;

        await register_plugins(this);

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