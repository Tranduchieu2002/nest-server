FROM node:lts AS dist
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . ./

RUN pnpm build

FROM node:lts AS node_modules
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

FROM node:lts

ARG PORT=3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=dist dist /usr/src/app/dist
COPY --from=node_modules node_modules /usr/src/app/node_modules

COPY . /usr/src/app

EXPOSE $PORT

CMD [ "pnpm", "start:prod" ]
