// TODO: add validation rules
export const InputTextArea = {
    name: 'InputTextArea',
    childless: true,
    props: {
        value: {
            type: 'string',
            nullable: true,
        },
        placeholder: {
            type: 'string',
            nullable: true,
        },
        lines: {
            type: 'number',
            default: 3,
        },
        label: {
            type: 'string',
            nullable: true,
        },
        hint: {
            type: 'string',
            nullable: true,
        },
        errorMsg: {
            type: 'string',
            nullable: true,
        },
        disabled: {
            type: 'boolean',
            default: false,
        },
    },
    uiParams: [
        'value',
        'placeholder',
        'lines',
        'label',
        'hint',
        'errorMsg',
        'disabled',
    ],
};
