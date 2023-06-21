import yaml from 'yaml';
import { ROOT_COMPONENT_ID } from './RootComponent.js';
const INCLUDE_STATEMENT = '$include:';
// TODO: перенести в Sprog
// TODO: поддержка sprog в формировании конфига - по сути это и есть sprog
/**
 * Loads all the components which are imported in root component and other components.
 * And return {pathToFileRelativeRootComponent: ComponentDefinition}
 */
export async function preloader(rootComponentYamlPath, loader) {
    const rootCmpDefStr = await loader(rootComponentYamlPath);
    const rootCompRawDef = yaml.parse(rootCmpDefStr);
    const rootCompDef = await recursiveInclude(rootCompRawDef, loader);
    let res = {
        [ROOT_COMPONENT_ID]: rootCompDef
        // TODO: add other components - get from root
    };
    if (rootCompDef.components) {
        for (const item of rootCompDef.components) {
            res[item.name] = item;
        }
        delete rootCompDef.components;
    }
    if (rootCompDef.screens) {
        for (const item of rootCompDef.screens) {
            res[item.name] = item;
        }
        delete rootCompDef.screens;
    }
    //console.log(4444, JSON.stringify(res, null, 2))
    return res;
}
async function recursiveInclude(current, loader) {
    if (Array.isArray(current)) {
        for (const arrIndex in current) {
            if (typeof current[arrIndex] === 'string'
                && current[arrIndex].indexOf(INCLUDE_STATEMENT) === 0) {
                current[arrIndex] = await recursiveInclude(await doInclude(current[arrIndex], loader), loader);
            }
            else {
                current[arrIndex] = await recursiveInclude(current[arrIndex], loader);
            }
        }
        return current;
    }
    else if (typeof current !== 'object') {
        return current;
    }
    // objects
    for (const itemName of Object.keys(current)) {
        if (typeof current[itemName] === 'string'
            && current[itemName].indexOf(INCLUDE_STATEMENT) === 0) {
            // string and include statement
            current[itemName] = await doInclude(current[itemName], loader);
        }
        else {
            current[itemName] = await recursiveInclude(await recursiveInclude(current[itemName], loader), loader);
        }
    }
    return current;
}
async function doInclude(includeStr, loader) {
    const filePath = includeStr.split(INCLUDE_STATEMENT)[1];
    let fileContentStr;
    try {
        fileContentStr = await loader(filePath);
    }
    catch (e) {
        throw new Error(`Can't include yaml file "${filePath}": ${e}`);
    }
    let jsContent;
    try {
        jsContent = yaml.parse(fileContentStr);
    }
    catch (e) {
        throw new Error(`Can't parse yaml file "${filePath}": ${e}`);
    }
    return jsContent;
}
