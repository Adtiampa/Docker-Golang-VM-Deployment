# Packager stage
FROM --platform=linux/arm64 golang:1.22.5 AS packager

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

# Builder stage
FROM --platform=linux/arm64 golang:1.22.5 AS builder

WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=arm64 go build -o main .

# Runtime stage
FROM --platform=linux/arm64 debian:bullseye-slim AS runner

WORKDIR /app
COPY --from=builder /app/main .
COPY .env .
EXPOSE 8080
CMD ["/app/main"]