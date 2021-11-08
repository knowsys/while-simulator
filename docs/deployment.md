# Deploying the web application

-   Build the application for production: `npm run build`
-   Setup a web server such as [Apache](http://httpd.apache.org/) or [nginx](https://nginx.org/en/)
    -   Copy the built application (from `/build`) to the web server
    -   Optionally configure the web server to let web browsers cache everything except the `build/index.html`
    -   Configure TLS

It is recommended to run the site on it's own domain or subdomain to limit the impact of potential XSS attacks.

See https://create-react-app.dev/docs/deployment/ for additional information.
