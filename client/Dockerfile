
# It uses the official Node.js 20 Alpine image as the base image.
FROM node:20-alpine

# Create app directory
WORKDIR /app

#copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install

#copy the rest of the app source code
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev", "--", "--host"]