import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import config from '../config/config'
import { ARTICLE_TYPES, wordCount } from '../submissions/articleTypes'
import { PageHeader } from '../components/utils'

const MAX_BRIEF_WORDS = 30
const MAX_FILE_BYTES = 10 * 1024 * 1024

const guidelines = [
  'The topics for submission should be related to peace and conflict resolution, peacebuilding activities at the economic, political, civil society and the social-cultural levels, with specific reference to India.',
  'The articles are published quarterly online, and are open to print as well.',
  'OIJPCR welcomes concise, pointed articles with a few recommendations.',
  'Articles should be between 1,000 and 1,500 words, in Times New Roman, 14 pt, with 1.5 line spacing.',
  'Submit the manuscript as a Word (.docx) file. Place each image inside the document where it should appear.',
  'A bibliography is not compulsory for a commentary or opinion. Research articles should follow the Chicago style manual (author-date).',
  'References, if used, should be compiled in a "References" section at the end of the article, not as footnotes.',
  'Articles submitted here should be exclusively for OIJPCR.',
  'The contributor is responsible for factual accuracy and research integrity.',
  'Include your email and a brief of no more than 30 words with the manuscript.',
  'End the manuscript with the line: "(Note: The author is solely responsible for the content of the article)"',
  'Submit the manuscript through this form. The editorial team reviews every contribution, and its decision is final.',
  'Book reviews of 1,000–1,500 words are welcome, with a photo of the book. The book should be related to peace and conflict resolution.',
  'Disclaimer: opinions in the articles may not coincide with those of the editorial team.',
]

const EMPTY = {
  authorName: '',
  email: '',
  affiliation: '',
  title: '',
  articleType: 'research',
  brief: '',
  note: '',
  fax_number: '',
}

const SubmitArticle = () => {
  const [fields, setFields] = useState(EMPTY)
  const [manuscript, setManuscript] = useState(null)
  const [bookPhoto, setBookPhoto] = useState(null)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [receipt, setReceipt] = useState(null)
  const resultRef = useRef(null)

  const briefWords = wordCount(fields.brief)
  const briefTooLong = briefWords > MAX_BRIEF_WORDS

  // The submit button sits at the bottom of a long form. Once the receipt replaces
  // it, bring that panel into view (and move focus to it) instead of leaving the
  // visitor looking at whatever was at their old scroll position.
  useEffect(() => {
    if (!receipt || !resultRef.current) return
    resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    resultRef.current.focus()
  }, [receipt])

  const onChange = (event) => {
    const { name, value } = event.target
    setFields((current) => ({ ...current, [name]: value }))
  }

  const onType = (value) => {
    setFields((current) => ({ ...current, articleType: value }))
    if (value !== 'book-review') setBookPhoto(null)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const problem = validate(fields, manuscript, bookPhoto)
    setError(problem)
    if (problem || sending) return

    const body = new FormData()
    Object.entries(fields).forEach(([key, value]) => body.append(key, value))
    body.append('manuscript', manuscript)
    if (bookPhoto) body.append('bookPhoto', bookPhoto)

    setSending(true)
    try {
      const { data } = await axios.post(`${config.host}/submissions`, body)
      setReceipt(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not send the submission. Try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Submit an article"
        lede="Send a draft for consideration. The editorial team reviews every manuscript and writes back by email."
      />
      <div className="wrap pb-16 md:pb-24">
        <div className="grid items-start gap-14 pt-10 border-t-2 lg:grid-cols-12 lg:gap-16" style={{ borderColor: 'var(--ink)' }}>
          <section className="lg:col-span-5 lg:sticky lg:top-28" aria-labelledby="guidelines-heading">
            <h2 id="guidelines-heading" className="section-title">Guidelines</h2>
            <ol className="mt-6 border-t" style={{ borderColor: 'var(--hair)' }}>
              {guidelines.map((guideline, index) => (
                <li key={guideline} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-3 border-b text-[0.9375rem] leading-relaxed" style={{ borderColor: 'var(--hair)', color: 'var(--ink-soft)' }}>
                  <span className="serif font-semibold" style={{ color: 'var(--accent)', fontFeatureSettings: "'lnum'" }}>{index + 1}</span>
                  <span>{guideline}</span>
                </li>
              ))}
            </ol>
          </section>

          <section
            ref={resultRef}
            tabIndex={-1}
            className="outline-none lg:col-span-7"
          >
            {receipt ? (
              <Receipt receipt={receipt} onReset={() => {
                setReceipt(null)
                setFields(EMPTY)
                setManuscript(null)
                setBookPhoto(null)
                setError('')
              }} />
            ) : (
              <form onSubmit={onSubmit} noValidate className="relative">
                <h2 className="section-title">Submission form</h2>
                <p className="mt-2 field-hint">
                  Fields marked with * are required.
                </p>

                <div className="grid gap-4 mt-6 sm:grid-cols-2">
                  <Field label="Full name" name="authorName" value={fields.authorName} onChange={onChange} required autoComplete="name" />
                  <Field label="Email" name="email" type="email" value={fields.email} onChange={onChange} required autoComplete="email" />
                </div>
                <Field label="Affiliation" name="affiliation" value={fields.affiliation} onChange={onChange} placeholder="University, organisation, or independent" autoComplete="organization" />
                <Field label="Article title" name="title" value={fields.title} onChange={onChange} required />

                <fieldset className="mt-6">
                  <legend className="field-label">Type of piece *</legend>
                  <div className="grid gap-2 mt-2 sm:grid-cols-3">
                    {ARTICLE_TYPES.map((type) => {
                      const selected = fields.articleType === type.value
                      return (
                        <label
                          key={type.value}
                          className={`flex items-center min-h-[48px] px-4 py-3 text-[0.9375rem] font-semibold border cursor-pointer transition-colors duration-150 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[color:var(--accent)] ${
                            selected ? 'bg-ink text-white border-ink' : 'border-[#a9aeb4] text-ink hover:border-ink'
                          }`}
                        >
                          <input
                            type="radio"
                            name="articleType"
                            value={type.value}
                            checked={selected}
                            onChange={() => onType(type.value)}
                            className="sr-only"
                          />
                          {type.label}
                        </label>
                      )
                    })}
                  </div>
                </fieldset>

                <label className="mt-6 field-label" htmlFor="brief">
                  Brief *
                </label>
                <p className="mt-1 field-hint">No more than 30 words.</p>
                <textarea
                  id="brief"
                  name="brief"
                  required
                  rows={4}
                  value={fields.brief}
                  onChange={onChange}
                  className="mt-2 field"
                />
                <p className={`mt-1 text-sm ${briefTooLong ? 'font-semibold text-accent-deep' : 'field-hint'}`}>
                  {briefWords} / {MAX_BRIEF_WORDS} words
                </p>

                <FilePicker
                  label="Manuscript"
                  required
                  hint="Word document (.docx), up to 10 MB"
                  accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  file={manuscript}
                  onFile={setManuscript}
                />

                {fields.articleType === 'book-review' && (
                  <FilePicker
                    label="Photo of the book"
                    required
                    hint="JPEG, PNG, WebP, or GIF, up to 10 MB"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    file={bookPhoto}
                    onFile={setBookPhoto}
                  />
                )}

                <label className="mt-6 field-label" htmlFor="note">
                  Note for the editors
                </label>
                <textarea
                  id="note"
                  name="note"
                  rows={3}
                  maxLength={1000}
                  value={fields.note}
                  onChange={onChange}
                  placeholder="Optional"
                  className="mt-2 field"
                />

                <div className="absolute overflow-hidden" style={{ left: '-9999px', width: 1, height: 1 }} aria-hidden="true">
                  <label htmlFor="fax_number">Fax</label>
                  <input
                    id="fax_number"
                    name="fax_number"
                    tabIndex={-1}
                    autoComplete="off"
                    value={fields.fax_number}
                    onChange={onChange}
                  />
                </div>

                {error && (
                  <p className="mt-6 font-semibold text-accent-deep" role="alert">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending || briefTooLong}
                  className="mt-8 btn"
                >
                  {sending ? 'Sending…' : 'Submit article'}
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </>
  )
}

function Field({ label, name, type = 'text', required = false, ...props }) {
  return (
    <label className="mt-6 field-label" htmlFor={name}>
      {label}{required ? ' *' : ''}
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        {...props}
        className="mt-2 font-normal field"
      />
    </label>
  )
}

function FilePicker({ label, hint, accept, file, onFile, required }) {
  return (
    <div className="mt-6">
      <p className="field-label">{label}{required ? ' *' : ''}</p>
      <label className="flex flex-col items-start px-4 py-5 mt-2 border border-dashed cursor-pointer border-[#a9aeb4] transition-colors duration-150 hover:border-ink focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[color:var(--accent)]">
        <span className="font-semibold underline text-ink underline-offset-4">
          {file ? file.name : 'Choose a file'}
        </span>
        <span className="mt-1 field-hint">{hint}</span>
        <input
          type="file"
          accept={accept}
          required={required && !file}
          className="sr-only"
          onChange={(event) => onFile(event.target.files?.[0] || null)}
        />
      </label>
    </div>
  )
}

function Receipt({ receipt, onReset }) {
  return (
    <div className="py-2">
      <h2 className="section-title">Submission received</h2>
      <p className="mt-3 summary">
        {receipt.message || 'The editorial team will review your manuscript.'}
      </p>
      {receipt.reference && (
        <p className="mt-4 meta">
          Reference <span className="font-mono font-semibold text-ink">{receipt.reference}</span>
        </p>
      )}
      <button
        type="button"
        onClick={onReset}
        className="mt-8 btn btn-ghost"
      >
        Submit another
      </button>
    </div>
  )
}

function validate(fields, manuscript, bookPhoto) {
  if (fields.authorName.trim().length < 2) return 'Enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) return 'Enter a valid email address.'
  if (fields.title.trim().length < 3) return 'Enter the article title.'
  const words = wordCount(fields.brief)
  if (!words) return 'Add a short brief.'
  if (words > MAX_BRIEF_WORDS) return 'The brief must be 30 words or fewer.'
  if (!manuscript) return 'Attach the manuscript as a Word (.docx) file.'
  if (!/\.docx$/i.test(manuscript.name)) return 'The manuscript must be a Word (.docx) file. PDF and .doc files cannot be accepted.'
  if (manuscript.size > MAX_FILE_BYTES) return 'The manuscript must be 10 MB or smaller.'
  if (fields.articleType === 'book-review') {
    if (!bookPhoto) return 'Attach a photo of the book.'
    if (!/^image\/(jpeg|png|webp|gif)$/.test(bookPhoto.type)) return 'Book photo must be a JPEG, PNG, WebP, or GIF.'
    if (bookPhoto.size > MAX_FILE_BYTES) return 'The book photo must be 10 MB or smaller.'
  }
  return ''
}

export default SubmitArticle
