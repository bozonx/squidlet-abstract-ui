import {Main} from './Main';
import {PackageContext} from './PackageContext';
import {AbstractUiPackage} from './types/types';


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
