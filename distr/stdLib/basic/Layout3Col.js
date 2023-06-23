export const Layout3Col = {
    name: 'LayoutThreeCol',
    props: {
        // use 1em, or 10px etc
        leftColWidth: {
            type: 'string',
        },
        centerColWidth: {
            type: 'string',
        },
        rightColWidth: {
            type: 'string',
        },
    },
    uiParams: [
        'leftColWidth',
        'centerColWidth',
        'rightColWidth',
    ],
    tmpl: [
        {
            component: 'Slot',
            slotName: 'left',
        },
        {
            component: 'Slot',
            slotName: 'center',
        },
        {
            component: 'Slot',
            slotName: 'right',
        },
    ]
};
