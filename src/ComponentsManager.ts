import {omitObj} from 'squidlet-lib';
import yaml from 'yaml';
import {Main} from './Main.js';
import {ComponentDefinition} from './Component.js';
import {STD_COMPONENTS} from './stdLib/index.js';
import {validateComponentDefinition} from './helpers/componentHelper.js';
import {AppDefinition} from './types/AppDefinition.js';


export class ComponentsManager {
  appDefinition!: AppDefinition
  private readonly main: Main
  // Components of registered libs and user defined. like: {componentName: ComponentDefinition}
  private readonly components: Record<string, ComponentDefinition> = {}


  constructor(main: Main) {
    this.main = main

    this.registerComponents(STD_COMPONENTS)
  }


  getComponentDefinition(componentName: string): ComponentDefinition {

    //console.log('requested cmp - ', pathOrStdComponentName)

    if (!this.components[componentName]) {
      throw new Error(`Can't find component "${componentName}"`)
    }

    return this.components[componentName]
  }

  registerApp(appDefinition: AppDefinition) {
    if (this.appDefinition) {
      throw new Error(`Can't replace the app definition`)
    }

    if (appDefinition.components) {
      this.registerComponents(appDefinition.components)
    }

    this.appDefinition = omitObj(appDefinition, 'components')
  }

  registerComponents(components: Record<string, string | ComponentDefinition>) {
    for (const cmpName of Object.keys(components)) {
      const cmp = components[cmpName]
      let resolvedComponentDef: ComponentDefinition

      // TODO: а зачем string??? разве не должно изначально распарситься???
      if (typeof cmp === 'string') {
        resolvedComponentDef = yaml.parse(cmp)
      }
      else if (typeof cmp === 'object') {
        resolvedComponentDef = cmp
      }
      else {
        throw new Error(`Unknown type of component "${typeof cmp}"`)
      }

      validateComponentDefinition(resolvedComponentDef)

      // TODO: name брать из самого компонента
      this.components[cmpName] = resolvedComponentDef
    }
  }

}
