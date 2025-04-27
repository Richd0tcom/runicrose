FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build



FROM node:22-alpine  AS runner

WORKDIR /app

COPY package*.json .

COPY --from=builder /app/dist ./dist

RUN npm run migrate-up

RUN npm ci --only=production

CMD ["node", "dist/index.js"]