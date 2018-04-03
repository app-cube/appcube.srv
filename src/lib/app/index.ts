import { Server } from 'hapi';
import { AppServerOptions, AppInternalSettings} from '../../types';
import { register_plugins } from '../../plugins/registration';

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

        this.app.options.server = this;

        await register_plugins(this);

        try {
            await this.start();
            console.log('server running at: ' + this.info.uri);
        } catch (e) {
            console.log('Could not start server. Error: ' + JSON.stringify(e));
        }
    }
}