import slugify from 'slugify'

/** Public URL of an article. Matches the existing /archive/:urlSlug/:id routes. */
export const articleUrl = ({ title = '', _id, id }) => `/archive/${slugify(title)}/${_id || id}`

/** Titles arrive from the CMS with stray runs of spaces. */
export const cleanTitle = (title = '') => title.replace(/\s+/g, ' ').trim()

/** "Peacebuilding, Regional Security" -> ["Peacebuilding", "Regional Security"] */
export const tagList = (tags = '') =>
  String(tags || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
