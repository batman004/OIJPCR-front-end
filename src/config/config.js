const ENV = process.env.REACT_APP_ENV;

let config = {
  protocol: "https",
  domain: "oijpcr.org",
  host: "https://api.oijpcr.org",
  timeoutValue: 6000,
  s3Host: "media.oijpcr.org",
};

if (ENV === "local") {
  config = {
    ...config,
    protocol: "http",
    domain: "localhost:3000",
    // Hits the dev-only proxy (src/setupProxy.js) which forwards to api.oijpcr.org
    host: "/_api",
  };
}

if (ENV === "dev") {
  config = {
    ...config,
    protocol: "https",
    domain: "dev.oijpcr-front-end.pages.dev",
    host: "https://api.oijpcr.org",
    timeoutValue: 6000,
    s3Host: "media-oijpcr",
  };
}

export default config;
