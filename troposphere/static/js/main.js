import bootstrapper from "bootstrapper";
import "css/app/app.scss";
import Raven from "raven-js";

let sentryDSN = "https://27643f06676048be96ad6df686c17da3@app.getsentry.com/73366";

Raven.config(sentryDSN, {
    release: "205096b5fde3a47303ad8d1fef9ff8052cbbd7d4"
}).install();

bootstrapper.run();
