const ENV = process.env.REACT_APP_ENV;

let config = {
  protocol: "https",
  domain: "oijpcr.org",
  host: "https://oijpcrapi.live",
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
}

if (ENV === "dev") {
  config = {
    ...config,
    protocol: "https",
    domain: "dev.oijpcr-front-end.pages.dev",
    host: "https://dev.oijpcrapi.live",
    timeoutValue: 6000,
    s3Host: "media-oijpcr",
  };
}

export default config;
