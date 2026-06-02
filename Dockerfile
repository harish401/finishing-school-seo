FROM node:20-alpine

WORKDIR /app

# Install standard dynamic library compatibility layer
RUN apk add --no-cache libc6-compat

# Copy dependency mappings
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy full project files
COPY . .

# Set environment to production build and run
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Compile Next.js and build database/route configurations
RUN npm run build

# Expose Node server port
EXPOSE 3000
ENV PORT 3000

# Execute server command
CMD ["npm", "start"]
