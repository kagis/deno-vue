FROM node:20.1.0-alpine3.17
WORKDIR /tmp
COPY package.json ./
RUN npm install
CMD ["cat", "bundle.js"]
COPY build.js entry.js stream_stub.js ./
RUN node build.js
