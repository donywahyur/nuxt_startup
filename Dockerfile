# Use the Node.js v22.11.0 version
FROM node:22.11.0-alpine as builder

# Set a flexible working directory
WORKDIR /app/nuxt-startup

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Build the Nuxt.js application
RUN npm run build

# Use a minimal Node.js image for the production server
FROM node:22.11.0-alpine

WORKDIR /app/nuxt-startup

# Copy the build output from the builder stage
COPY --from=builder /app/nuxt-startup/.output /app/nuxt-startup/.output

# Expose the port Nuxt.js uses (default 3000)
EXPOSE 3000

# Start the Nuxt.js application
CMD ["npm", "run", "start"]
