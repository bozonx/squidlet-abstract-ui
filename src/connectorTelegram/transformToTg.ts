import {RenderedElement} from '../../../../../../../mnt/disk2/workspace/squidlet-abstract-ui/src/types/RenderedElement.js';
import {TgReplyButton} from './TgReplyButton.js';


// const CALLBACK_COMMANDS = {
//   click: 'CLICK|',
//   toRoute: 'TO_ROUTE|',
// }


const renderComponent: Record<string, (el: RenderedElement) => [TgReplyButton[][], string]> = {

  // TODO: add ForEach ???
  // TODO: add RenderComponent ???

  Document: (el: RenderedElement) => renderComponent.Container(el),
  Button: (el: RenderedElement) => {
    return [
      [[{
        text: el.params?.text || 'No text',
        //callback_data: CALLBACK_COMMANDS.click + el.componentId
        callback_data: el.componentId,
      }]],
      ''
    ]
  },
  ButtonGroup: (el: RenderedElement) => {
    return [
      [
        (el.children || [])
          .map((item) => renderComponent[item.name](item)[0][0][0]),
      ],
      ''
    ]
  },
  Link: (el: RenderedElement) => {
    return [
      [[{
        text: el.params?.text || 'No text',
        //callback_data: CALLBACK_COMMANDS.toRoute + el.params?.path || '',
        callback_data: el.componentId,
      }]]
      , ''
    ]
  },
  ExternalLink: (el: RenderedElement) => {
    return [
      [[{
        text: el.params?.text || 'No text',
        url: el.params?.url || '',
      }]]
      , ''
    ]
  },
  CheckBox: (el: RenderedElement) => {

    // TODO: add

    return [[], '']
  },
  Container: (el: RenderedElement) => {
    let res: TgReplyButton[][] = []
    const messages: string[] = []

    for (const item of el.children || []) {
      const renderedItem = renderComponent[item.name](item)

      if (renderedItem[1]) messages.push(renderedItem[1])

      res = [
        ...res,
        ...renderedItem[0],
      ]
    }

    return [res, messages.join('\n')]
  },
  MainSection: (el: RenderedElement) => renderComponent.Container(el),
  Nav: (el: RenderedElement) => renderComponent.Container(el),
  NestedMenu: (el: RenderedElement) => {
    return [
      [[{
        text: el.params?.text || 'No text',
        //callback_data: CALLBACK_COMMANDS.toRoute + el.name
        callback_data: el.componentId,
      }]],
      el.params?.header || ''
    ]
  },
  RadioGroupInput: (el: RenderedElement) => {

    // TODO: add

    return [[], '']
  },
  MultiSelectInput: (el: RenderedElement) => {

    // TODO: add

    return [[], '']
  },
  SelectInput: (el: RenderedElement) => {

    // TODO: add

    return [[], '']
  },
  SideMenu: (el: RenderedElement) => renderComponent.Container(el),
  Text: (el: RenderedElement) => {
    return [[], el.params?.text || '']
  },
  VerticalMenu: (el: RenderedElement) => {
    const res = renderComponent.Container(el)

    return [
      res[0],
      (el.params?.header) ? el.params.header + '\n' + res[1] : res[1]
    ]
  },
  Router: (el: RenderedElement) => {

    // TODO: add ???

    return [[], '']
  }
}


export function transformToTg(el: RenderedElement | RenderedElement[]): [TgReplyButton[][],  string] {
  const els = (Array.isArray(el)) ? el : el.children || []
  let res: TgReplyButton[][] = []
  let message = ''

  for (const item of els) {
    const rendered: [TgReplyButton[][], string] = renderComponent[item.name](item)

    res = [
      ...res,
      ...rendered[0],
    ]

    message += rendered[1]
  }

  return [res, message]
}
