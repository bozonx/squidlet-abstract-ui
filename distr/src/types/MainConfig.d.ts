import { LogLevel } from 'squidlet-lib';
export interface MainConfig {
    logLevel: LogLevel;
    debug: boolean;
}
export declare const MAIN_CONFIG_DEFAULTS: MainConfig;
