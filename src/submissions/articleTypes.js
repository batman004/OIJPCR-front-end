export const ARTICLE_TYPES = [
  { value: 'research', label: 'Research article' },
  { value: 'commentary', label: 'Commentary or opinion' },
  { value: 'book-review', label: 'Book review' },
]

export const articleTypeLabel = (value) =>
  ARTICLE_TYPES.find((type) => type.value === value)?.label || value

export const wordCount = (text) =>
  String(text || '').trim().split(/\s+/).filter(Boolean).length
