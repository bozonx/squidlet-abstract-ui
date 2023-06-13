import {IndexedEventEmitter, Logger} from 'squidlet-lib'
import {AppSingleton} from './AppSingleton.js';
import {AppRouter} from './routerBase/AppRouter.js';
import {RootComponent} from './RootComponent.js';


export class AppContext {
  private app: AppSingleton

  get router(): AppRouter {
    return this.app.router
  }

  get events(): IndexedEventEmitter {
    return this.app.events
  }

  get log(): Logger {
    return this.app.log
  }

  get root(): RootComponent {
    return this.app.root
  }


  constructor(app: AppSingleton) {
    this.app = app;
  }

}
