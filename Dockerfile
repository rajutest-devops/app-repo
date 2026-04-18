FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS build-deps
RUN npm ci

FROM build-deps AS builder
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:80/health || exit 1
CMD ["nginx", "-g", "daemon off;"]
