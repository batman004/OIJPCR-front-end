const ENV = 'prod'

let config = {
    protocol: 'https',
    domain: 'oijpcr.org',
    host: 'https://oijpcrapi.live/',
    timeoutValue: 6000,
}

if (ENV === 'dev') {
    config = {
        ...config,
        protocol: 'http',
        domain: 'localhost:3000',
        host: 'http://localhost:8080/',
    }
}

export default config
