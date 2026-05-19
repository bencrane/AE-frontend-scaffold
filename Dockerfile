# syntax=docker/dockerfile:1.7
#
# Static Vite build + tiny Node `serve` runtime for Railway deploy.
# Build context = repo root. Doppler is optional: if DOPPLER_TOKEN is passed
# as a build arg, `pnpm build` runs under `doppler run` and any VITE_* secrets
# from the bound Doppler config are baked into the static bundle. If no token
# is passed, the build still succeeds — Railway's BUILD env vars (set via
# `railway variables set --service platform-app VITE_SUPABASE_URL=... ...`)
# are also picked up by Vite at build time (Vite reads import.meta.env.VITE_*
# from process.env). Pattern mirrors /Users/benjamincrane/capital-expansion-hq/Dockerfile.

# ---- deps ----
FROM node:20-slim AS deps
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- build ----
FROM node:20-slim AS builder
RUN apt-get update && apt-get install -y --no-install-recommends curl gnupg ca-certificates apt-transport-https \
    && rm -rf /var/lib/apt/lists/*
RUN curl -sLf --retry 3 --tlsv1.2 --proto "=https" \
        "https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key" \
        | gpg --dearmor -o /usr/share/keyrings/doppler-archive-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/doppler-archive-keyring.gpg] https://packages.doppler.com/public/cli/deb/debian any-version main" \
        > /etc/apt/sources.list.d/doppler-cli.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends doppler \
    && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG DOPPLER_TOKEN
ENV DOPPLER_TOKEN=$DOPPLER_TOKEN
RUN if [ -n "$DOPPLER_TOKEN" ]; then \
        doppler run -- pnpm build; \
    else \
        pnpm build; \
    fi

# ---- runner ----
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN npm install -g serve@14
COPY --from=builder /app/dist ./dist
RUN useradd --create-home --shell /bin/sh appuser \
    && chown -R appuser:appuser /app
USER appuser
EXPOSE 3000
CMD ["sh", "-c", "serve dist -l ${PORT:-3000} -s"]
