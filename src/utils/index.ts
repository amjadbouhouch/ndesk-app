import { IPage } from 'models/IPage'
import { nanoid } from 'nanoid'

export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}
export const generatePageId = (title = '') => `${slugify(title)}-${nanoid()}`

export const generateEmptyPage = (title = 'hello'): IPage => {
  const uniqueId = generatePageId(title)
  return {
    title,
    description: ``,
    _id: uniqueId,
    content: ``,
    url: uniqueId,
    cover:
      'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bm90ZXN8ZW58MHx8MHx8&w=1000&q=80'
  }
}
export const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
