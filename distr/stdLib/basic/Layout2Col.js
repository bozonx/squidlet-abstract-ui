export const Layout2Col = {
    name: 'Layout2Col',
    props: {
        // use 1em, or 10px etc
        leftColWidth: {
            type: 'string',
        },
        rightColWidth: {
            type: 'string',
        },
    },
    uiParams: [
        'leftColWidth',
        'rightColWidth',
    ],
    tmpl: [
        {
            component: 'Slot',
            slotName: 'left',
        },
        {
            component: 'Slot',
            slotName: 'right',
        },
    ]
};
