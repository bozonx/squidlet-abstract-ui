// const CALLBACK_COMMANDS = {
//   click: 'CLICK|',
//   toRoute: 'TO_ROUTE|',
// }
const renderComponent = {
    // TODO: add ForEach ???
    // TODO: add RenderComponent ???
    Document: (el) => renderComponent.Container(el),
    Button: (el) => {
        return [
            [[{
                        text: el.params?.text || 'No text',
                        //callback_data: CALLBACK_COMMANDS.click + el.componentId
                        callback_data: el.componentId,
                    }]],
            ''
        ];
    },
    ButtonGroup: (el) => {
        return [
            [
                (el.children || [])
                    .map((item) => renderComponent[item.name](item)[0][0][0]),
            ],
            ''
        ];
    },
    Link: (el) => {
        return [
            [[{
                        text: el.params?.text || 'No text',
                        //callback_data: CALLBACK_COMMANDS.toRoute + el.params?.path || '',
                        callback_data: el.componentId,
                    }]],
            ''
        ];
    },
    ExternalLink: (el) => {
        return [
            [[{
                        text: el.params?.text || 'No text',
                        url: el.params?.url || '',
                    }]],
            ''
        ];
    },
    CheckBox: (el) => {
        // TODO: add
        return [[], ''];
    },
    Container: (el) => {
        let res = [];
        const messages = [];
        for (const item of el.children || []) {
            const renderedItem = renderComponent[item.name](item);
            if (renderedItem[1])
                messages.push(renderedItem[1]);
            res = [
                ...res,
                ...renderedItem[0],
            ];
        }
        return [res, messages.join('\n')];
    },
    MainSection: (el) => renderComponent.Container(el),
    Nav: (el) => renderComponent.Container(el),
    NestedMenu: (el) => {
        return [
            [[{
                        text: el.params?.text || 'No text',
                        //callback_data: CALLBACK_COMMANDS.toRoute + el.name
                        callback_data: el.componentId,
                    }]],
            el.params?.header || ''
        ];
    },
    RadioGroupInput: (el) => {
        // TODO: add
        return [[], ''];
    },
    MultiSelectInput: (el) => {
        // TODO: add
        return [[], ''];
    },
    SelectInput: (el) => {
        // TODO: add
        return [[], ''];
    },
    SideMenu: (el) => renderComponent.Container(el),
    Text: (el) => {
        return [[], el.params?.text || ''];
    },
    VerticalMenu: (el) => {
        const res = renderComponent.Container(el);
        return [
            res[0],
            (el.params?.header) ? el.params.header + '\n' + res[1] : res[1]
        ];
    },
    Router: (el) => {
        // TODO: add ???
        return [[], ''];
    }
};
export function transformToTg(el) {
    const els = (Array.isArray(el)) ? el : el.children || [];
    let res = [];
    let message = '';
    for (const item of els) {
        const rendered = renderComponent[item.name](item);
        res = [
            ...res,
            ...rendered[0],
        ];
        message += rendered[1];
    }
    return [res, message];
}
