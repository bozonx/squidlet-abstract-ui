import {LogLevel} from 'squidlet-lib'


export interface MainConfig {
  logLevel: LogLevel
  debug: boolean
}

export const MAIN_CONFIG_DEFAULTS: MainConfig = {
  logLevel: 'info',
  debug: false,
}
