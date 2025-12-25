# Use Node.js 20 Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy application code
COPY . .

# Set default API URL for build time
ENV NEXT_PUBLIC_API_URL=http://localhost:8000

# Build the Next.js application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]