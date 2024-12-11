FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json, package-lock.json, and tsconfig.json
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install --verbose

# Copy the rest of the application code
COPY . .

# Start the application
CMD ["npm", "start"]