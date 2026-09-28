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
    host: "http://localhost:8080",
  };
} else if (process.env.NODE_ENV === "development") {
  // `npm start` runs in the browser on localhost. Call the prod API through
  // the dev proxy in src/setupProxy.js so CORS does not block the page.
  config = {
    ...config,
    protocol: "http",
    domain: "localhost:3000",
    host: "/_api",
  };
}

if (ENV === "dev") {
  config = {
    ...config,
    protocol: "https",
    domain: "dev.oijpcr-front-end.pages.dev",
    host: "https://dev.oijpcrapi.site",
    timeoutValue: 6000,
    s3Host: "media-oijpcr",
  };
}

export default config;
