#!/usr/bin/env node
/**
 * Freezes the public site's content for a static (API-free) build.
 *
 * Crawls every read-only endpoint the public pages call, downloads the media
 * those responses reference, rewrites media URLs to the local copies, and
 * writes one JSON file per API path under public/snapshot/. A build with
 * REACT_APP_ENV=static then reads these files instead of api.oijpcr.org.
 *
 * Usage: node scripts/snapshot.mjs [--no-media]
 * Only GET requests are made. Media already in public/snapshot/media is reused.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import slugify from 'slugify'

const API = 'https://api.oijpcr.org'
const OUT = path.resolve('public/snapshot')
const MEDIA_HOSTS = /^https:\/\/(media\.oijpcr\.org|oijpcr\.org|api\.oijpcr\.org|media-oijpcr\.s3\.[a-z0-9-]+\.amazonaws\.com)\//
const withMedia = !process.argv.includes('--no-media')

// Keep in sync with snapshotFile() in src/utils/useApi.js. Only [a-z0-9-] stay literal,
// so names stay unique on case-insensitive filesystems.
const snapshotFile = (apiPath) => {
  let p = apiPath
  try { p = decodeURIComponent(apiPath) } catch {}
  return p.replace(/^\//, '').replace(/[^a-z0-9-]/g, (c) => `_${c.codePointAt(0).toString(16)}_`) + '.json'
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const tagList = (tags = '') => String(tags || '').split(',').map((t) => t.trim()).filter(Boolean)

const responses = new Map()
async function get(apiPath) {
  if (responses.has(apiPath)) return responses.get(apiPath)
  let res
  // Be gentle with the live API: pace requests and back off when rate-limited.
  for (let attempt = 0; ; attempt++) {
    await sleep(250)
    res = await fetch(API + encodeURI(apiPath), { headers: { Origin: 'https://oijpcr.org' } })
    if (res.status !== 429 || attempt === 8) break
    const wait = Number(res.headers.get('retry-after')) || 30
    console.warn(`429 on ${apiPath}; waiting ${wait}s`)
    await sleep(wait * 1000)
  }
  if (!res.ok) throw new Error(`${res.status} GET ${apiPath}`)
  const data = await res.json()
  responses.set(apiPath, data)
  return data
}

const home = await get('/journals/home/5')
const topics = await get('/journals/tags')
const archive = await get('/journals/archive')

const articles = new Map()
const addArticles = (list) => (Array.isArray(list) ? list : []).forEach((a) => a?._id && articles.set(a._id, a))
addArticles(home)
for (const { volume } of archive) {
  addArticles(await get(`/journals/all/${volume}/info`))
  await get(`/journals/limit/${volume}/4`)
}

const tags = new Set(topics)
for (const summary of [...articles.values()]) {
  const full = await get(`/journals/${slugify(summary.title || '')}/${summary._id}`)
  tagList(full.tags).forEach((t) => tags.add(t))
}
for (const tag of tags) addArticles(await get(`/journals/tags/${tag}`))

// Media: download everything on our hosts, then point responses at the copies.
const urlMap = new Map()
if (withMedia) {
  const found = new Set()
  for (const data of responses.values()) {
    for (const m of JSON.stringify(data).matchAll(/https:\/\/[^"'\s\\)<>]+/g)) if (MEDIA_HOSTS.test(m[0])) found.add(m[0])
  }
  await fs.mkdir(path.join(OUT, 'media'), { recursive: true })
  for (const url of found) {
    const name = decodeURIComponent(new URL(url).pathname.split('/').pop() || 'file').replace(/[^A-Za-z0-9._-]/g, '_')
    const file = path.join(OUT, 'media', name)
    const exists = await fs.access(file).then(() => true, () => false)
    if (!exists) {
      const res = await fetch(url)
      if (!res.ok) { console.warn(`skip ${res.status} ${url}`); continue }
      await fs.writeFile(file, Buffer.from(await res.arrayBuffer()))
    }
    urlMap.set(url, `/snapshot/media/${encodeURIComponent(name)}`)
  }
}
const rewrite = (json) => {
  let s = json
  for (const [from, to] of urlMap) s = s.split(from).join(to)
  return s
}

for (const [apiPath, data] of responses) {
  await fs.writeFile(path.join(OUT, snapshotFile(apiPath)), rewrite(JSON.stringify(data)))
}
await fs.writeFile(path.join(OUT, 'SNAPSHOT.txt'), `Captured from ${API} on ${new Date().toISOString()}\n`)
console.log(`${responses.size} responses, ${articles.size} articles, ${tags.size} tags, ${urlMap.size} media files -> ${OUT}`)
