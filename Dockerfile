# Stage 1: Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY . .

# Build the TypeScript project
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine AS runner

# Set environment to production
ENV NODE_ENV=production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the built files from the builder stage
COPY --from=builder /app/dist ./dist

# Create uploads directory (needed for the application)
RUN mkdir -p src/uploads/challenges src/uploads/profiles

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["node", "dist/server.js"]