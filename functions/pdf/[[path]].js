// Serves article PDFs from oijpcr.org/pdf/<file>.pdf so readers never leave the main domain.
// The files themselves live in the media bucket behind media.oijpcr.org.
const MEDIA_ORIGIN = 'https://media.oijpcr.org'
const FORWARDED_REQUEST_HEADERS = ['range', 'if-none-match', 'if-modified-since']
const FORWARDED_RESPONSE_HEADERS = [
  'content-length',
  'content-range',
  'accept-ranges',
  'etag',
  'last-modified',
]

export async function onRequest({ request }) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } })
  }

  const { pathname } = new URL(request.url)
  const key = pathname.replace(/^\/pdf\//, '')

  let decodedKey
  try {
    decodedKey = decodeURIComponent(key)
  } catch (e) {
    return new Response('Not found', { status: 404 })
  }

  const isSafePdfKey =
    /\.pdf$/i.test(decodedKey) && !decodedKey.includes('..') && !decodedKey.includes('\\')
  if (!key || !isSafePdfKey) {
    return new Response('Not found', { status: 404 })
  }

  const headers = new Headers()
  FORWARDED_REQUEST_HEADERS.forEach((name) => {
    const value = request.headers.get(name)
    if (value) headers.set(name, value)
  })

  const upstream = await fetch(`${MEDIA_ORIGIN}/${key}`, {
    method: request.method,
    headers,
    cf: { cacheEverything: true, cacheTtl: 86400 },
  })

  if (upstream.status !== 200 && upstream.status !== 206 && upstream.status !== 304) {
    return new Response('Not found', { status: upstream.status === 304 ? 304 : 404 })
  }

  const fileName = decodedKey.split('/').pop()
  const responseHeaders = new Headers({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `inline; filename*=UTF-8''${encodeURIComponent(fileName)}`,
    'Cache-Control': 'public, max-age=86400',
    'X-Content-Type-Options': 'nosniff',
  })
  FORWARDED_RESPONSE_HEADERS.forEach((name) => {
    const value = upstream.headers.get(name)
    if (value) responseHeaders.set(name, value)
  })

  return new Response(request.method === 'HEAD' ? null : upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  })
}
