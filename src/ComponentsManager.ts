import yaml from 'yaml';
import {Main} from './Main.js';
import {ComponentDefinition} from './Component.js';
import {STD_COMPONENTS} from './stdLib/index.js';
import {RootComponentDefinition} from './RootComponent.js';
import {validateComponentDefinition} from './helpers/componentHelper.js';


export class ComponentsManager {
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

  registerComponents(components: Record<string, string | ComponentDefinition | RootComponentDefinition>) {
    for (const cmpName of Object.keys(components)) {
      const cmp = components[cmpName]
      let resolvedComponent: ComponentDefinition

      if (typeof cmp === 'string') {
        resolvedComponent = yaml.parse(cmp)
      }
      else if (typeof cmp === 'object') {
        resolvedComponent = cmp
      }
      else {
        throw new Error(`Unknown type of component "${typeof cmp}"`)
      }

      validateComponentDefinition(resolvedComponent)

      this.components[cmpName] = resolvedComponent
    }
  }

}
