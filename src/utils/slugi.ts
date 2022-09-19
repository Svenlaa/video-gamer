import slugify from 'slugify'

export const slugi = (string: string) =>
  slugify(string, {
    replacement: '_',
    lower: true,
    strict: true
  })
