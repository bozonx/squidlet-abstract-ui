import {isEmptyObject} from 'squidlet-lib'


export function makeStyleTag(rawStyle?: Record<string, any>): string {
  if (!rawStyle) return ''

  const res: Record<string, any> = {}

  for (const key of Object.keys(rawStyle)) {
    if (typeof rawStyle[key] === undefined) continue

    res[key] = rawStyle[key]
  }

  if (isEmptyObject(res)) return ''

  const styles = Object.keys(res).map((key) => `${key}: ${res[key]}`)

  return `style="${styles.join('; ')}"`
}
