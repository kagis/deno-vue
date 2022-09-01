FROM node:18.8-alpine3.16
WORKDIR /tmp
COPY package.json ./
RUN npm install
CMD ["cat", "bundle.js"]
COPY build.js entry.js stream_stub.js ./
RUN node build.js
