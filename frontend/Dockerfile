FROM node:18-alpine AS builder

# Define build arguments for environment variables
ARG VITE_API_URL

# Set environment variables during the build process
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
