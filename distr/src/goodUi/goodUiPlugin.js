import { GOOD_UI } from './index';
export function goodUiPlugin() {
    return (context) => {
        context.registerComponentsLib(GOOD_UI);
    };
}
