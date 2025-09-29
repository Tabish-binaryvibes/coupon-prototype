# Stage 1: Builder
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .
RUN npm run build

# Stage 2: Production - Distroless
FROM gcr.io/distroless/nodejs18-debian11

WORKDIR /app

# Copy only needed production files
# Adjust the path to copy from serve/build to dist
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
# Copy the server.js script
COPY server.cjs ./

# Expose the port the app will run on
EXPOSE 3000

# Set the command to run the app
CMD ["server.cjs"]