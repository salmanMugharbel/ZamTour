# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (clean install for consistency)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from the build stage to Nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 3001

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
