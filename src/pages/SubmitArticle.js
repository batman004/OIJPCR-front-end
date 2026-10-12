import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import config from '../config/config'
import { ARTICLE_TYPES, wordCount } from '../submissions/articleTypes'

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
    <div className="flex-grow w-full max-w-7xl">
      <div className="mx-4 mt-8 mb-12 sm:mx-8">
        <h1 className="text-3xl font-bold md:text-5xl primary-color">Submit your article</h1>
        <p className="max-w-3xl mt-4 text-lg text-gray-700">
          Send a draft for consideration. The editorial team reviews every manuscript and writes back by email.
        </p>

        <div className="grid items-start gap-8 mt-8 lg:grid-cols-5">
          <section className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900">Guidelines for submissions</h2>
            <ol className="pl-5 mt-4 space-y-3 text-sm leading-relaxed text-gray-700 list-decimal">
              {guidelines.map((guideline) => (
                <li key={guideline}>{guideline}</li>
              ))}
            </ol>
          </section>

          <section
            ref={resultRef}
            tabIndex={-1}
            className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm outline-none lg:col-span-3"
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
                <h2 className="text-xl font-bold text-gray-900">Submission form</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Fields marked with * are required.
                </p>

                <div className="grid gap-4 mt-6 sm:grid-cols-2">
                  <Field label="Full name" name="authorName" value={fields.authorName} onChange={onChange} required autoComplete="name" />
                  <Field label="Email" name="email" type="email" value={fields.email} onChange={onChange} required autoComplete="email" />
                </div>
                <Field label="Affiliation" name="affiliation" value={fields.affiliation} onChange={onChange} placeholder="University, organisation, or independent" autoComplete="organization" />
                <Field label="Article title" name="title" value={fields.title} onChange={onChange} required />

                <fieldset className="mt-4">
                  <legend className="text-base font-semibold text-gray-900">Type of piece *</legend>
                  <div className="grid gap-2 mt-2 sm:grid-cols-3">
                    {ARTICLE_TYPES.map((type) => {
                      const selected = fields.articleType === type.value
                      return (
                        <label
                          key={type.value}
                          className={`px-3 py-3 text-sm font-semibold border-2 rounded-lg cursor-pointer ${
                            selected ? 'border-oijpcr-blue bg-blue-50 text-gray-900' : 'border-gray-300 text-gray-700'
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

                <label className="block mt-4 text-base font-semibold text-gray-900" htmlFor="brief">
                  Brief *
                </label>
                <p className="mt-1 text-sm text-gray-500">No more than 30 words.</p>
                <textarea
                  id="brief"
                  name="brief"
                  required
                  rows={4}
                  value={fields.brief}
                  onChange={onChange}
                  className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-oijpcr-blue"
                />
                <p className={`mt-1 text-sm ${briefTooLong ? 'font-semibold text-red-600' : 'text-gray-500'}`}>
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

                <label className="block mt-4 text-base font-semibold text-gray-900" htmlFor="note">
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
                  className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-oijpcr-blue"
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
                  <p className="mt-4 text-base font-semibold text-red-600" role="alert">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending || briefTooLong}
                  className="px-6 py-3 mt-6 font-semibold text-white rounded-lg primary-color-bg disabled:opacity-60"
                >
                  {sending ? 'Sending…' : 'Submit article'}
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

function Field({ label, name, type = 'text', required = false, ...props }) {
  return (
    <label className="block mt-4 text-base font-semibold text-gray-900" htmlFor={name}>
      {label}{required ? ' *' : ''}
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        {...props}
        className="w-full h-12 px-4 mt-2 font-normal border-2 border-gray-300 rounded-lg focus:outline-none focus:border-oijpcr-blue"
      />
    </label>
  )
}

function FilePicker({ label, hint, accept, file, onFile, required }) {
  return (
    <div className="mt-4">
      <p className="text-base font-semibold text-gray-900">{label}{required ? ' *' : ''}</p>
      <label className="flex flex-col items-start px-4 py-4 mt-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-oijpcr-blue">
        <span className="text-sm font-semibold text-oijpcr-blue">
          {file ? file.name : 'Choose a file'}
        </span>
        <span className="mt-1 text-sm text-gray-500">{hint}</span>
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
    <div>
      <h2 className="text-xl font-bold text-gray-900">Submission received</h2>
      <p className="mt-3 text-gray-700">
        {receipt.message || 'The editorial team will review your manuscript.'}
      </p>
      {receipt.reference && (
        <p className="mt-4 text-sm text-gray-600">
          Reference <span className="font-mono font-semibold text-gray-900">{receipt.reference}</span>
        </p>
      )}
      <button
        type="button"
        onClick={onReset}
        className="px-6 py-3 mt-6 font-semibold text-white rounded-lg primary-color-bg"
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
