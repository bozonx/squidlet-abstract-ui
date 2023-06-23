export const Header = {
    name: 'Header',
    childless: true,
    props: {
        value: {
            type: 'string',
            default: '',
            nullable: true,
        },
        level: {
            type: 'number',
            default: 1,
            nullable: true,
        }
    },
    uiParams: ['value', 'level'],
};
