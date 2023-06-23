export const LayoutPage = {
    name: 'LayoutPage',
    props: {
        // use 1em, or 10px etc
        pageWidth: {
            type: 'string',
            default: '960px',
        },
    },
    uiParams: [
        'pageWidth',
    ],
};
