export interface RenderedElement {
  // Element name. Actually means component name
  name: string
  // id of component in component tree which is handle this element
  componentId: string
  // Id of parent component
  // An empty string means it is root and don't have children
  // but do not check it - use Component.isRoot instead
  parentId: string
  // -1 means root
  parentChildPosition: number
  // unified params for rendered element
  params?: Record<string, any>
  children?: RenderedElement[]
}
