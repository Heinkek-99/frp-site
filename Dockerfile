# Multi-stage build for Next.js 16
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies with increased timeout
RUN \
  if [ -f yarn.lock ]; then \
    yarn install --frozen-lockfile --network-timeout 600000; \
  elif [ -f package-lock.json ]; then \
    npm ci; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm i --frozen-lockfile; \
  else \
    echo "No lockfile found, running npm install" && npm i; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build with increased memory
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the application
RUN \
  if [ -f yarn.lock ]; then \
    yarn build; \
  elif [ -f package-lock.json ]; then \
    npm run build; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm run build; \
  else \
    npm run build; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Set correct permissions for standalone mode
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone server files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]