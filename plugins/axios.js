import Vue from 'vue';
import humps from 'humps';

function generateRequestId() {
  return Math.round(Math.random() * 36 ** 6).toString(36);
}

function startExecTimer() {
  if (typeof performance !== 'undefined') return performance.now();

  if (typeof process !== 'undefined' && typeof process.hrtime !== 'undefined') return process.hrtime();

  return Date.now();
}

function stopExecTimer(previousTime) {
  if (!previousTime) return '';

  if (typeof performance !== 'undefined') return `${performance.now() - previousTime}ms`;

  if (typeof process !== 'undefined' && typeof process.hrtime !== 'undefined') {
    const diff = process.hrtime(previousTime);
    const secondsAsMs = diff[0] * 1000;
    const nanosecondsAsMs = diff[1] / 100000;
    return `${secondsAsMs + nanosecondsAsMs}ms`;
  }

  return `${Date.now() - previousTime}ms`;
}

export default function({ $axios }) {
  $axios.onRequest((config) => {
    config.data = humps.decamelizeKeys(config.data);
    if (process.env.debugLevel !== 'debug') return;

    config._id = generateRequestId();
    config._t0 = startExecTimer();

    const log = `$axios[${config._id}] ${config.method.toUpperCase()} ${config.baseURL}/${config.url}`;
    if (process.env.debugAxiosVerbose === 'true') {
      Vue.$log.debug(log, config);
    } else {
      Vue.$log.debug(log);
    }
  });
  $axios.onResponse((response) => {
    response.data = humps.camelizeKeys(response.data);
    if (process.env.debugLevel !== 'debug') return;

    const t0 = response.config._t0;
    const r = response;
    const config = response.config;

    const log = `$axios[${config._id}] ${r.status} ${r.statusText} - ${stopExecTimer(t0)}`;
    if (process.env.debugAxiosVerbose === 'true') {
      Vue.$log.debug(log, response);
    } else {
      Vue.$log.debug(log);
    }
  });
}
