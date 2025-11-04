# Frontend/Dockerfile

# Stage 1: Base builder
FROM node:22.16.0-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Stage 2: Build app (for production)
FROM base AS builder
ENV NODE_ENV=production
RUN npm run build

# Stage 3: Production runtime
FROM node:22.16.0-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production

# Install wget for healthcheck
RUN apk add --no-cache wget

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

CMD ["npm", "start"]

# Stage 4: Development target (now builds like prod but with dev env)
FROM base AS dev-builder
ENV NODE_ENV=production
RUN npm run build

# Stage 5: Development runtime
FROM node:22.16.0-alpine AS dev
WORKDIR /app
ENV NODE_ENV=production

# Install wget for healthcheck
RUN apk add --no-cache wget

COPY --from=dev-builder /app/.next ./.next
COPY --from=dev-builder /app/public ./public
COPY --from=dev-builder /app/node_modules ./node_modules
COPY --from=dev-builder /app/package*.json ./

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Use npm start (same as prod) instead of npm run dev
CMD ["npm", "start"]