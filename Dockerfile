FROM node:16 AS builder

ARG CACHE_BUST
ARG CI_COMMIT_SHA

RUN apt-get update && apt-get install -y python2 make g++ && \
    ln -sf /usr/bin/python2 /usr/local/bin/python && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

FROM nginx:1.25-alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
