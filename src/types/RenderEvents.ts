export enum RenderEvents {
  // mount UI element and it's children
  mount,
  // unmount UI element and it's children
  unMount,
  // update only UI element params or children add/remove/move
  update,
  // renderer has to totally destroy component and umount it to
  destroy,
}
