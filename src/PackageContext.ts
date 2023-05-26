import {Logger} from 'squidlet-lib'
import {Main} from './Main.js';


export class PackageContext {
  private readonly main: Main


  constructor(main: Main) {
    this.main = main
  }


  setRouter() {
    this.main.app.setRouter()
  }

  setLogger(logger: Logger) {
    this.main.setLogger(logger)
  }

  registerComponents(components: Record<string, string>) {
    this.main.componentsManager.registerComponents(components)
  }

}
