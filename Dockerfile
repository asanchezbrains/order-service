FROM node:18-alpine

RUN mkdir /app
WORKDIR /app

COPY tsconfig*.json ./
COPY package.json ./
COPY nest-cli*.json ./

RUN npm install

COPY src/ src/

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]