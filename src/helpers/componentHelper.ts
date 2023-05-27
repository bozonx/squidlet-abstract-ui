import {
  SuperStruct,
  ProxyfiedStruct,
} from 'squidlet-sprog'
import {omitObj} from 'squidlet-lib'
import {CmpInstanceDefinition} from '../types/CmpInstanceDefinition.js';
import {SlotsDefinition} from '../ComponentSlotsManager.js';
import {Component, ComponentDefinition} from '../Component.js';
import {AppSingleton} from '../AppSingleton.js';
import {RenderedElement} from '../types/RenderedElement.js';


export function parseCmpDefinition(app: AppSingleton, childUiDefinition: CmpInstanceDefinition): {
  componentName: string
  propsValues: Record<string, any>
  slotDefinition: SlotsDefinition
  componentDefinition: ComponentDefinition
  props: ProxyfiedStruct
  propSetter: (pathTo: string, newValue: any) => void
} {
  const componentName: string = childUiDefinition.component
  // values of child props which are set in this (parent) component
  const propsValues: Record<string, any> = omitObj(
    childUiDefinition,
    'component',
    'slot'
  )
  const componentDefinition = app.getComponentDefinition(componentName)
  // TODO: use proxy
  const props = new SuperStruct(
    // if no props then put just empty props
    componentDefinition.props || {},
    // props are readonly by default
    true
  )
  const propSetter = props.init(propsValues)
  let slotDefinition: SlotsDefinition = {}

  if (Array.isArray(childUiDefinition.slot)) {
    slotDefinition = {
      default: childUiDefinition.slot
    }
  }
  else if (typeof childUiDefinition.slot === 'object') {
    slotDefinition = childUiDefinition.slot
  }

  // TODO: в childPropsValues как примитивы, так и sprog - надо его выполнить наверное
  // TODO: props должен быть связан с текущим компонентом
  // TODO: propSetter надо сохранить себе чтобы потом устанавливать значения

  return {
    componentName,
    propsValues,
    slotDefinition,
    componentDefinition,
    props,
    propSetter,
  }
}

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

    if (typeof parentChildPosition === 'undefined') {
      throw new Error(`Can't find my "${cmp.id}" position of parent ${cmp.parent.id}`)
    }

    return {
      ...baseParams,
      parentId: cmp.parent.id,
      parentChildPosition,
    }
  }
}

export function makeComponentUiParams(
  componentDefinition: ComponentDefinition,
  props: ProxyfiedStruct,
  state: ProxyfiedStruct,
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
