# -------- Stage 1: Build --------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency files first (for caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy remaining files
COPY . .

# -------- Stage 2: Runtime --------
FROM node:18-alpine

WORKDIR /app

# Copy built app from builder stage
COPY --from=builder /app /app

# Create non-root user (security best practice)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser

EXPOSE 3000

CMD ["node", "app.js"]