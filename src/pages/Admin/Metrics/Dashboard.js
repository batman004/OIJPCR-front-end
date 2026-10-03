import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../UserContext'
import { MetricsHandler, apiErrorMessage } from '../utils'
import { BarList, SeriesTable, Sparkline, TrendChart } from './MetricsCharts'
import {
  articleUrl, engagementRate, formatCompact, formatDay, formatNumber,
  formatPercent, percentChange, relativeDate,
} from './metricsUtils'

const RANGES = [7, 30, 90]
const TOP_ARTICLES = 10

const CLICK_LABELS = {
  card: 'Article card click-throughs',
  pdf: 'PDF opens',
  print: 'Prints',
  tag: 'Tag clicks',
}

const SHARE_LABELS = {
  twitter: 'Twitter / X',
  linkedin: 'LinkedIn',
  link: 'Copied link',
}

const Dashboard = () => {
  const { token } = useContext(UserContext)
  const [days, setDays] = useState(30)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    MetricsHandler.dashboard(days, token)
      .then((result) => { if (!cancelled) setData(result) })
      .catch((err) => { if (!cancelled) setError(apiErrorMessage(err, 'Could not load metrics')) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [days, token])

  useEffect(() => load(), [load])

  return (
    <div className="w-full px-2 mx-auto max-w-6xl md:px-4">
      <div className="flex flex-wrap items-end justify-between my-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">
            {data ? subtitle(data) : 'Loading metrics...'}
          </p>
        </div>
        <RangePicker days={days} onChange={setDays} />
      </div>

      {error && <ErrorNotice message={error} onRetry={load} />}
      {!data && loading && <Skeleton />}

      {data && (
        <div className={loading ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
          <TrackingNotice data={data} />
          <KpiRow data={data} />

          <Card title="Views per day" className="mt-6">
            <TrendChart series={data.series} />
            <SeriesTable series={data.series} />
          </Card>

          <Card title="Articles" className="mt-6" note={`Last ${data.range.days} days`}>
            <ArticleTable articles={data.articles} />
          </Card>

          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <Card title="Recent uploads" note={contentSummary(data.content)}>
              <RecentUploads articles={data.recent} />
            </Card>
            <Card title="Popular tags" note="By views of tagged articles">
              <PopularTags tags={data.tags} />
            </Card>
          </div>

          <div className="grid gap-6 mt-6 mb-8 md:grid-cols-2">
            <Card title="How readers engage" note={`Clicks, last ${data.range.days} days`}>
              <BarList
                items={Object.entries(CLICK_LABELS).map(([key, label]) => ({
                  key, label, value: data.clickTargets[key],
                }))}
              />
            </Card>
            <Card title="Where articles are shared" note={`Shares, last ${data.range.days} days`}>
              <BarList
                items={Object.entries(SHARE_LABELS).map(([key, label]) => ({
                  key, label, value: data.shareChannels[key],
                }))}
              />
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

const subtitle = (data) =>
  data.trackingSince
    ? `${formatDay(data.range.start, true)} to ${formatDay(data.range.end, true)}`
    : 'No activity recorded yet'

const contentSummary = (content) =>
  `${formatNumber(content.articles)} articles · ${formatNumber(content.volumes)} volumes · ${formatNumber(content.withPdf)} with PDF`

function RangePicker({ days, onChange }) {
  return (
    <div className="inline-flex mt-2 overflow-hidden border border-gray-300 rounded-lg" role="group" aria-label="Date range">
      {RANGES.map((range) => (
        <button
          key={range}
          type="button"
          onClick={() => onChange(range)}
          aria-pressed={days === range}
          className={`px-4 py-2 text-sm font-semibold ${
            days === range ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {range} days
        </button>
      ))}
    </div>
  )
}

function Card({ title, note, className = '', children }) {
  return (
    <section className={`p-4 bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      <div className="flex flex-wrap items-baseline justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        {note && <p className="text-xs text-gray-500">{note}</p>}
      </div>
      {children}
    </section>
  )
}

// Counters only exist from the day this feature shipped; say so rather than
// let a wall of zeros look like a bug.
function TrackingNotice({ data }) {
  if (data.trackingSince && data.trackingSince <= data.range.start) return null

  return (
    <p className="px-4 py-3 mb-4 text-sm text-blue-900 border-l-4 border-blue-500 rounded-md bg-blue-50">
      {data.trackingSince
        ? `Tracking started on ${formatDay(data.trackingSince, true)}. Activity before that date was not recorded, so earlier days show zero.`
        : 'Tracking is on. Views, clicks and shares will appear here as readers visit articles.'}
    </p>
  )
}

function KpiRow({ data }) {
  const { totals, previous, series } = data
  const rate = totals.views ? (totals.clicks + totals.shares) / totals.views : 0
  const previousRate = previous.views ? (previous.clicks + previous.shares) / previous.views : 0
  const period = `previous ${data.range.days} days`

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatTile
        label="Views" value={formatCompact(totals.views)}
        change={percentChange(totals.views, previous.views)} period={period}
        spark={series.map((d) => d.views)}
      />
      <StatTile
        label="Clicks" value={formatCompact(totals.clicks)}
        change={percentChange(totals.clicks, previous.clicks)} period={period}
        spark={series.map((d) => d.clicks)}
      />
      <StatTile
        label="Shares" value={formatCompact(totals.shares)}
        change={percentChange(totals.shares, previous.shares)} period={period}
        spark={series.map((d) => d.shares)}
      />
      <StatTile
        label="Engagement rate" value={formatPercent(rate)}
        change={percentChange(rate, previousRate)} period={period}
        hint="Clicks + shares per view"
      />
    </div>
  )
}

function StatTile({ label, value, change, period, spark, hint }) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <p className="text-sm font-semibold text-gray-600">{label}</p>
      <div className="flex items-end justify-between mt-1">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {spark && <Sparkline values={spark} />}
      </div>
      <p className="mt-1 text-xs text-gray-500">
        <Delta change={change} />
        {change !== null && <span> vs {period}</span>}
        {change === null && hint && <span>{hint}</span>}
      </p>
    </div>
  )
}

// Up is good for every metric here. Arrow + sign carry direction, not colour alone.
function Delta({ change }) {
  if (change === null) return <span>No earlier data</span>
  if (Math.abs(change) < 0.0005) return <span className="font-semibold text-gray-700">— 0%</span>

  const up = change > 0
  return (
    <span className={`font-semibold ${up ? 'text-green-700' : 'text-red-600'}`}>
      {up ? '▲ +' : '▼ −'}{Math.round(Math.abs(change) * 100)}%
    </span>
  )
}

const COLUMNS = [
  { key: 'views', label: 'Views' },
  { key: 'clicks', label: 'Clicks' },
  { key: 'shares', label: 'Shares' },
  { key: 'engagement', label: 'Engagement', hideOnSmall: true },
  { key: 'trend', label: 'Traction', hideOnSmall: true },
]

const sortValue = {
  views: (a) => a.views,
  clicks: (a) => a.clicks,
  shares: (a) => a.shares,
  engagement: engagementRate,
  trend: (a) => a.views7 - a.viewsPrev7,
}

function ArticleTable({ articles }) {
  const [sortKey, setSortKey] = useState('views')
  const [showAll, setShowAll] = useState(false)

  const sorted = useMemo(() => {
    const value = sortValue[sortKey]
    return [...articles].sort((a, b) => value(b) - value(a) || b.views - a.views)
  }, [articles, sortKey])

  if (articles.length === 0) return <p className="text-sm text-gray-500">No articles yet.</p>

  const rows = showAll ? sorted : sorted.slice(0, TOP_ARTICLES)
  const maxViews = Math.max(...articles.map((a) => a.views), 0)

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b border-gray-200">
              <th className="py-2 pr-3 font-semibold">Article</th>
              {COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className={`px-2 py-2 font-semibold text-right ${column.hideOnSmall ? 'hidden md:table-cell' : ''}`}
                  aria-sort={sortKey === column.key ? 'descending' : 'none'}
                >
                  <button
                    type="button"
                    onClick={() => setSortKey(column.key)}
                    className={`font-semibold hover:text-gray-900 ${sortKey === column.key ? 'text-gray-900' : ''}`}
                  >
                    {column.label}{sortKey === column.key ? ' ↓' : ''}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((article) => (
              <ArticleRow key={article.id} article={article} maxViews={maxViews} />
            ))}
          </tbody>
        </table>
      </div>

      {sorted.length > TOP_ARTICLES && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="mt-3 text-sm font-semibold text-oijpcr-blue hover:underline"
        >
          {showAll ? `Show top ${TOP_ARTICLES}` : `Show all ${sorted.length} articles`}
        </button>
      )}
    </>
  )
}

function ArticleRow({ article, maxViews }) {
  return (
    <tr className="align-top border-b border-gray-100 tabular-nums">
      <td className="py-2 pr-3" style={{ minWidth: 130 }}>
        <Link to={articleUrl(article)} className="font-semibold text-gray-900 hover:underline">
          {article.title}
        </Link>
        <p className="text-xs text-gray-500">
          Vol {article.volume} · {article.author} · {relativeDate(article.createdAt)}
        </p>
      </td>
      <td className="px-2 py-2 text-right" style={{ minWidth: 72 }}>
        <span className="font-semibold">{formatNumber(article.views)}</span>
        <div className="mt-1 ml-auto bg-gray-100 rounded-sm" style={{ height: 6, width: 56 }}>
          <div
            style={{
              height: 6,
              width: maxViews ? `${Math.max((article.views / maxViews) * 100, article.views ? 3 : 0)}%` : 0,
              background: '#2B2BD6',
              borderRadius: '0 3px 3px 0',
            }}
          />
        </div>
      </td>
      <td className="px-2 py-2 text-right">{formatNumber(article.clicks)}</td>
      <td className="px-2 py-2 text-right">{formatNumber(article.shares)}</td>
      <td className="hidden px-2 py-2 text-right md:table-cell">
        {article.views ? formatPercent(engagementRate(article)) : '—'}
      </td>
      <td className="hidden px-2 py-2 text-right md:table-cell">
        <Traction article={article} />
      </td>
    </tr>
  )
}

// Views in the last 7 days against the 7 days before that.
function Traction({ article }) {
  const { views7, viewsPrev7 } = article
  if (!views7 && !viewsPrev7) return <span className="text-gray-400">—</span>
  if (!viewsPrev7) return <span className="font-semibold text-green-700">▲ New</span>
  return <Delta change={percentChange(views7, viewsPrev7)} />
}

function RecentUploads({ articles }) {
  if (articles.length === 0) return <p className="text-sm text-gray-500">No articles yet.</p>

  return (
    <ul className="divide-y divide-gray-100">
      {articles.map((article) => (
        <li key={article.id} className="flex items-start justify-between py-2">
          <div className="min-w-0">
            <Link to={articleUrl(article)} className="font-semibold text-gray-900 hover:underline">
              {article.title}
            </Link>
            <p className="text-xs text-gray-500">
              Vol {article.volume} · {article.author} · {relativeDate(article.createdAt)}
              {!article.hasPdf && ' · no PDF'}
            </p>
          </div>
          <p className="flex-shrink-0 ml-3 text-sm text-right tabular-nums">
            <span className="font-semibold">{formatNumber(article.allTimeViews)}</span>
            <span className="block text-xs text-gray-500">views</span>
          </p>
        </li>
      ))}
    </ul>
  )
}

function PopularTags({ tags }) {
  // Before any views exist, rank by how many articles carry the tag.
  const byViews = tags.some((tag) => tag.views > 0)

  return (
    <BarList
      empty="No tags yet."
      items={tags.map((tag) => ({
        key: tag.tag,
        label: tag.tag,
        to: `/tags/${tag.tag}`,
        value: byViews ? tag.views : tag.articles,
        detail: byViews ? `${tag.articles} ${tag.articles === 1 ? 'article' : 'articles'}` : 'articles',
      }))}
    />
  )
}

function ErrorNotice({ message, onRetry }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 mb-4 text-red-900 border-l-4 border-red-600 rounded-md bg-red-50" role="alert">
      <p className="text-sm font-semibold">{message}</p>
      <button type="button" onClick={onRetry} className="ml-4 text-sm font-semibold underline">
        Try again
      </button>
    </div>
  )
}

function Skeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => <div key={i} className="h-28 bg-gray-100 rounded-lg" />)}
      </div>
      <div className="mt-6 bg-gray-100 rounded-lg h-72" />
      <div className="mt-6 bg-gray-100 rounded-lg h-64" />
    </div>
  )
}

export default Dashboard
