// TODO: add style - rounded, flat etc
// TODO: add color - primary, secondary etc
export const Button = {
    name: 'Button',
    childless: true,
    props: {
        value: {
            type: 'string',
            nullable: true,
        },
        leftIcon: {
            type: 'string',
            nullable: true,
        },
        disabled: {
            type: 'boolean',
            default: false,
        },
        pending: {
            type: 'boolean',
            default: false,
        },
        to: {
            type: 'string',
            nullable: true,
        },
        showExternalIcon: {
            type: 'boolean',
            default: true,
        }
    },
    uiParams: [
        'value',
        'leftIcon',
        'disabled',
        'pending',
        'to',
        'showExternalIcon'
    ],
};
