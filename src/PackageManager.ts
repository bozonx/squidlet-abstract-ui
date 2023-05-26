import {Main} from './Main.js';
import {PackageContext} from './PackageContext.js';
import {AbstractUiPackage} from './types/types.js';


export class PackageManager {
  private readonly main: Main
  private readonly context: PackageContext


  constructor(main: Main) {
    this.main = main
    this.context = new PackageContext(this.main)
  }


  use(pkg: AbstractUiPackage) {
    pkg(this.context)
  }

}
