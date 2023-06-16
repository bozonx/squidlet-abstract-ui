import {
  ProxyfiedStruct,
  ProxyfiedData,
} from 'squidlet-sprog'
import {omitObj} from 'squidlet-lib'
import {CmpInstanceDefinition} from '../types/CmpInstanceDefinition.js';
import {Component} from '../Component.js';
import {RenderedElement} from '../types/RenderedElement.js';
import {ComponentDefinition} from '../types/ComponentDefinition.js';
import {AppSingleton} from '../AppSingleton.js';
import {SlotsDefinition} from '../stdLib/Slot.js';


export function parseCmpInstanceDefinition(instanceDefinition: CmpInstanceDefinition): {
  componentName: string,
  propsValues: Record<string, any>
  slotDefinition: SlotsDefinition
} {
  const componentName: string = instanceDefinition.component
  // values of child props which are set in this (parent) component
  const propsValues: Record<string, any> = omitObj(
    instanceDefinition,
    'component',
    'slot'
  )

  let slotDefinition: SlotsDefinition = {}

  if (Array.isArray(instanceDefinition.slot)) {
    slotDefinition = {
      default: instanceDefinition.slot
    }
  }
  else if (instanceDefinition.slot && typeof instanceDefinition.slot === 'object') {
    slotDefinition = instanceDefinition.slot
  }

  return { componentName, propsValues, slotDefinition }
}

/**
 * Make instances of my direct children
 * @private
 */
export function instantiateChildComponent(
  childInstanceDefinition: CmpInstanceDefinition,
  app: AppSingleton,
  parent: Component,
  scopeComponent: Component
): Component {
  const {
    componentName,
    propsValues,
    slotDefinition,
  } = parseCmpInstanceDefinition(childInstanceDefinition)

  const componentDefinition = app.getComponentDefinition(
    componentName
  )
  // use class defined in component or simple component
  const ComponentClass = componentDefinition.Component || Component

  return new ComponentClass(
    app,
    parent,
    componentDefinition,
    propsValues,
    slotDefinition,
    scopeComponent
  )
}


// TODO: review

export function renderComponentBase(cmp: Component): RenderedElement {
  const baseParams = {
    name: cmp.name,
    componentId: cmp.id,
  }

  if (cmp.isRoot) {
    return {
      ...baseParams,
      parentId: '',
      parentChildPosition: -1,
    }
  }
  else {
    // not root means it is Component. It has to have parent
    if (!cmp.parent) {
      throw new Error(`It "${cmp.id}" isn't root but doesn't have parent`)
    }

    const parentChildPosition = cmp.parent.getIndexOfChild(cmp.id)

    if (parentChildPosition === -1) {
      throw new Error(`Can't find my "${cmp.id}" position of parent ${cmp.parent.id}`)
    }

    return {
      ...baseParams,
      parentId: cmp.parent.id,
      parentChildPosition,
    }
  }
}

// TODO: review
export function makeComponentUiParams(
  componentDefinition: ComponentDefinition,
  props: ProxyfiedStruct,
  state: ProxyfiedData,
): Record<string, any> | undefined {
  if (!componentDefinition.uiParams) return

  const res: Record<string, any> = {}

  for (const item of componentDefinition.uiParams) {
    if (typeof item === 'string') {
      if (state.hasKey(item)) {
        // deep param path is supported
        res[item] = state.getValue(item)
      }
      else if (props.hasKey(item)) {
        res[item] = props.getValue(item)
      }
    }
    else {
      // means [string, () => any]
      res[item[0]] = item[1]()
    }
  }

  if (!Object.keys(res).length) return

  return res
}

export function validateComponentDefinition(cmp: ComponentDefinition) {
  // TODO: validate component
}
