import {LogLevel} from 'squidlet-lib'


export interface AppConfig {
  logLevel: LogLevel
  debug: boolean
}

export const APP_CONFIG_DEFAULTS: AppConfig = {
  logLevel: 'info',
  debug: false,
}
