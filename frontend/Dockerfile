FROM --platform=linux/arm64 node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

ENV VITE_API_URL=http://localhost:8080

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev", "--host"]