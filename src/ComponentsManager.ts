import yaml from 'yaml';
import {Main} from './Main.js';
import {ComponentDefinition} from './Component.js';
import {STD_COMPONENTS} from './stdLib/index.js';
import {ROOT_COMPONENT_ID} from './RootComponent.js';


export class ComponentsManager {
  private readonly main: Main
  // Components of registered libs and user defined. like: {componentName: ComponentDefinition}
  private readonly components: Record<string, ComponentDefinition> = {}


  constructor(main: Main) {
    this.main = main

    this.registerComponents(STD_COMPONENTS)
  }


  getComponentDefinition(componentName: string): ComponentDefinition {

    //console.log(111, 'requested cmp - ', pathOrStdComponentName)

    if (this.components[componentName]) {
      return this.components[componentName]
    }
    else {
      throw new Error(`Can't find component "${componentName}"`)
    }
  }

  registerComponents(components: Record<string, string | ComponentDefinition>) {
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
      // set root name for root compoent
      if (cmpName === ROOT_COMPONENT_ID) resolvedComponent.name = 'root'

      this.components[cmpName] = resolvedComponent
    }
  }

}
