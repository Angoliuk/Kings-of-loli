FROM --platform=linux/amd64 node:lts-alpine as builder

ENV HOST=0.0.0.0

WORKDIR /web

COPY package.json .

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm build

FROM --platform=linux/amd64 nginx

COPY --from=builder /web/dist /usr/share/nginx/html
