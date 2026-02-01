# Use Node.js 20 base image
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Final stage
FROM node:20-slim

WORKDIR /app

# Copy built app and dependencies
COPY --from=builder /app .

# Expose port
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]
