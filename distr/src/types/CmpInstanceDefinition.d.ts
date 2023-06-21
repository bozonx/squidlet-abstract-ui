export interface CmpInstanceDefinitionBase {
    component: string;
    slot?: CmpInstanceDefinition[] | Record<any, CmpInstanceDefinition[]>;
}
export interface CmpInstanceDefinition extends CmpInstanceDefinitionBase {
    [index: string]: any;
}
