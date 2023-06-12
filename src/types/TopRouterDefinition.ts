
// TODO: это должен быть верхний роутер - в браузере или SSR

export interface TopRouterDefinition {

  // TODO: add other props and methods

  push(pathTo: string): void
  replace(pathTo: string): void
}
