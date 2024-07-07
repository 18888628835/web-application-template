ARG NODE_VERSION=18.17.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

ARG FOLDER_NAME=web

ARG PNPM_VERSION=9.4.0

ARG TURBO_VERSION=2.0.4

ARG BUILD_ENV
# Set PNPM_HOME to /pnpm
ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory for all build stages.
WORKDIR /app

# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

# Install turbo.
RUN pnpm install -g turbo@${TURBO_VERSION}
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN turbo prune ${FOLDER_NAME} --docker

FROM base as installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

RUN pnpm install

COPY --from=builder /app/out/full/ .

RUN pnpm turbo run build:${BUILD_ENV} --filter=${FOLDER_NAME}...

################################################################################
# Create a stage for building the application.
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/${FOLDER_NAME}/next.config.js .
COPY --from=installer /app/apps/${FOLDER_NAME}/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/${FOLDER_NAME}/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/${FOLDER_NAME}/.next/static ./apps/${FOLDER_NAME}/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/${FOLDER_NAME}/public ./apps/${FOLDER_NAME}/public

EXPOSE 3000
CMD node apps/web/server.js
