FROM docker.lcgc.work/node:base-1.1.0

WORKDIR .

RUN cnpm install
RUN cnpm run clint-build

ENTRYPOINT NOE_ENV=production npx egg-scripts start ./server --env=prod --port=${APP_PORT}
