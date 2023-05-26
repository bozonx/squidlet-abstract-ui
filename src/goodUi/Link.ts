


export const Link = `
name: Link
uiParams:
  - path
  - text
handlers:
  click:
    $exp: newSuperFunc
    props:
      pathToRoute:
        type: string
        default:
          $exp: getPrimitive
          path: context.args[0]
    lines:
      - $exp: callSuperFunc
        path: app.router.toPath
        params:
          path:
            $exp: getPrimitive
            path: context.pathToRoute

`

// - $exp: simpleCall
//   $jsExp: console.log(555, context.args, context.pathToRoute)

// export const LINK_TYPE = 'Link'
//
//
// export interface Link extends InputBase {
//   type: typeof LINK_TYPE
//   disabled: boolean
//   text: string
//   path: string
// }
//
//
// export function link(params: InputInitial<Link>): Link {
//   return {
//     type: LINK_TYPE,
//     ...INPUT_DEFAULTS,
//     ...params,
//   }
// }
