import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDay, formatNumber, niceStep } from './metricsUtils'

// Single-series charts use the site's accent; everything else is neutral ink.
const ACCENT = '#2B2BD6'
const GRID = '#e5e7eb'
const AXIS = '#d1d5db'
const MUTED = '#6b7280'
const SURFACE = '#ffffff'

function useWidth() {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const measure = () => setWidth(node.clientWidth)
    measure()
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, width]
}

const TREND_HEIGHT = 240
const MARGIN = { top: 12, right: 16, bottom: 28, left: 44 }

// Daily views as one line with a faint area wash. Clicks and shares ride along
// in the hover tooltip rather than as extra lines: they are an order of
// magnitude smaller and would be flattened on a shared axis.
export function TrendChart({ series }) {
  const [ref, width] = useWidth()
  const [hover, setHover] = useState(null)

  const count = series.length
  const peak = Math.max(0, ...series.map((d) => d.views))
  const step = niceStep(Math.max(peak, 4) / 4)
  const top = step * 4
  const ticks = [0, 1, 2, 3, 4].map((i) => i * step)

  const innerW = Math.max(0, width - MARGIN.left - MARGIN.right)
  const innerH = TREND_HEIGHT - MARGIN.top - MARGIN.bottom
  const x = (i) => MARGIN.left + (count > 1 ? (i * innerW) / (count - 1) : innerW / 2)
  const y = (value) => MARGIN.top + innerH - (value / top) * innerH

  const line = series.map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(d.views).toFixed(1)}`).join(' ')
  const area = `${line} L${x(count - 1).toFixed(1)},${y(0)} L${x(0).toFixed(1)},${y(0)} Z`

  // Fewer date labels on narrow screens so neighbours never touch.
  const labelStops = width < 520 ? [0, 0.5, 1] : [0, 0.25, 0.5, 0.75, 1]
  const labelIndexes = labelStops
    .map((f) => Math.round(f * (count - 1)))
    .filter((v, i, all) => all.indexOf(v) === i)

  const onMove = (event) => {
    const box = event.currentTarget.getBoundingClientRect()
    const ratio = (event.clientX - box.left) / box.width
    setHover(Math.min(count - 1, Math.max(0, Math.round(ratio * (count - 1)))))
  }

  const point = hover === null ? null : series[hover]
  const empty = peak === 0

  return (
    <div ref={ref} className="relative w-full" style={{ height: TREND_HEIGHT }}>
      {width > 0 && (
        <svg
          width={width}
          height={TREND_HEIGHT}
          role="img"
          aria-label={`Views per day, ${formatDay(series[0].day)} to ${formatDay(series[count - 1].day)}`}
        >
          {ticks.map((tick) => (
            <g key={tick}>
              <line
                x1={MARGIN.left} x2={width - MARGIN.right}
                y1={y(tick)} y2={y(tick)}
                stroke={tick === 0 ? AXIS : GRID} strokeWidth="1"
              />
              <text x={MARGIN.left - 8} y={y(tick) + 4} textAnchor="end" fontSize="11" fill={MUTED}>
                {formatNumber(tick)}
              </text>
            </g>
          ))}

          {labelIndexes.map((i, n) => (
            <text
              key={i} x={x(i)} y={TREND_HEIGHT - 8} fontSize="11" fill={MUTED}
              textAnchor={n === 0 ? 'start' : i === count - 1 ? 'end' : 'middle'}
            >
              {formatDay(series[i].day)}
            </text>
          ))}

          <path d={area} fill={ACCENT} fillOpacity="0.1" />
          <path d={line} fill="none" stroke={ACCENT} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

          {point && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={MARGIN.top} y2={y(0)} stroke={AXIS} strokeWidth="1" />
              <circle cx={x(hover)} cy={y(point.views)} r="5" fill={ACCENT} stroke={SURFACE} strokeWidth="2" />
            </g>
          )}

          <rect
            x={MARGIN.left} y={MARGIN.top} width={innerW} height={innerH}
            fill="transparent" style={{ touchAction: 'pan-y' }}
            onPointerMove={onMove} onPointerDown={onMove} onPointerLeave={() => setHover(null)}
          />
        </svg>
      )}

      {empty && width > 0 && (
        <p className="absolute inset-x-0 text-sm text-center text-gray-500 pointer-events-none" style={{ top: '40%' }}>
          No views recorded in this period yet.
        </p>
      )}

      {point && width > 0 && (
        <div
          className="absolute z-10 px-3 py-2 text-sm bg-white border border-gray-200 rounded-md shadow-lg pointer-events-none"
          style={{
            top: MARGIN.top,
            ...(x(hover) > width / 2
              ? { right: width - x(hover) + 12 }
              : { left: x(hover) + 12 }),
          }}
        >
          <p className="font-semibold text-gray-900">{formatDay(point.day, true)}</p>
          <TooltipRow color={ACCENT} label="Views" value={point.views} />
          <TooltipRow label="Clicks" value={point.clicks} />
          <TooltipRow label="Shares" value={point.shares} />
        </div>
      )}
    </div>
  )
}

function TooltipRow({ color, label, value }) {
  return (
    <p className="flex items-center justify-between text-gray-700 tabular-nums" style={{ minWidth: 110 }}>
      <span className="flex items-center">
        <span
          className="inline-block w-2 h-2 mr-2 rounded-full"
          style={{ background: color || 'transparent' }}
          aria-hidden="true"
        />
        {label}
      </span>
      <span className="ml-4 font-semibold">{formatNumber(value)}</span>
    </p>
  )
}

// The accessible alternative to the chart: the same numbers as a table.
export function SeriesTable({ series }) {
  return (
    <details className="mt-3 text-sm">
      <summary className="cursor-pointer text-gray-600 hover:text-gray-900">View as table</summary>
      <div className="mt-2 overflow-y-auto border border-gray-200 rounded-md" style={{ maxHeight: 256 }}>
        <table className="w-full text-left tabular-nums">
          <thead className="sticky top-0 bg-gray-50">
            <tr className="text-gray-600">
              <th className="px-3 py-2 font-semibold">Day</th>
              <th className="px-3 py-2 font-semibold text-right">Views</th>
              <th className="px-3 py-2 font-semibold text-right">Clicks</th>
              <th className="px-3 py-2 font-semibold text-right">Shares</th>
            </tr>
          </thead>
          <tbody>
            {[...series].reverse().map((d) => (
              <tr key={d.day} className="border-t border-gray-100">
                <td className="px-3 py-1">{formatDay(d.day, true)}</td>
                <td className="px-3 py-1 text-right">{formatNumber(d.views)}</td>
                <td className="px-3 py-1 text-right">{formatNumber(d.clicks)}</td>
                <td className="px-3 py-1 text-right">{formatNumber(d.shares)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  )
}

const SPARK_W = 96
const SPARK_H = 32

export function Sparkline({ values }) {
  const max = Math.max(...values, 1)
  const px = (i) => 4 + (i * (SPARK_W - 8)) / Math.max(values.length - 1, 1)
  const py = (v) => SPARK_H - 4 - (v / max) * (SPARK_H - 8)
  const path = values.map((v, i) => `${i ? 'L' : 'M'}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(' ')
  const last = values.length - 1

  return (
    <svg width={SPARK_W} height={SPARK_H} aria-hidden="true" className="flex-shrink-0">
      <path d={path} fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={px(last)} cy={py(values[last])} r="4" fill={ACCENT} stroke={SURFACE} strokeWidth="2" />
    </svg>
  )
}

// Horizontal bars, value at the tip. Rows are links when `to` is given.
export function BarList({ items, empty = 'Nothing to show yet.' }) {
  const max = Math.max(...items.map((item) => item.value), 0)

  if (items.length === 0) return <p className="text-sm text-gray-500">{empty}</p>

  return (
    <ul>
      {items.map((item) => {
        const label = item.to
          ? <Link to={item.to} className="truncate hover:underline">{item.label}</Link>
          : <span className="truncate">{item.label}</span>

        return (
          <li key={item.key || item.label} className="py-1.5">
            <div className="flex items-baseline justify-between text-sm text-gray-800">
              {label}
              <span className="flex-shrink-0 ml-3 font-semibold tabular-nums">
                {formatNumber(item.value)}
                {item.detail && <span className="ml-2 font-normal text-gray-500">{item.detail}</span>}
              </span>
            </div>
            <div className="mt-1 bg-gray-100 rounded-sm" style={{ height: 8 }}>
              <div
                style={{
                  height: 8,
                  width: max ? `${Math.max((item.value / max) * 100, item.value ? 2 : 0)}%` : 0,
                  background: ACCENT,
                  borderRadius: '0 4px 4px 0',
                }}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
