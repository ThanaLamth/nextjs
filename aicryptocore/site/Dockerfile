FROM node:22-bookworm-slim AS deps

WORKDIR /app

COPY aicryptocore/site/package.json ./
COPY aicryptocore/site/package-lock.json ./

RUN npm ci

FROM node:22-bookworm-slim AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY aicryptocore/site ./

RUN npm run build

FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "run", "start"]
