// TODO: add validation rules
// TODO: steps
export const InputNumber = {
    name: 'InputNumber',
    childless: true,
    props: {
        value: {
            type: 'number',
            nullable: true,
        },
        placeholder: {
            type: 'string',
            nullable: true,
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
        leftIcon: {
            type: 'string',
            nullable: true,
        },
        rightIcon: {
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
        'label',
        'hint',
        'errorMsg',
        'leftIcon',
        'rightIcon',
        'disabled',
    ],
};
