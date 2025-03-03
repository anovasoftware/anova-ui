FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /anova-ui

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your Angular application code
COPY . .

# Build the Angular application in production mode.
# Adjust the build command if needed (e.g., if your build target differs)
#RUN npm run build -- --prod
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the built files from the previous stage to Nginx's HTML directory
COPY --from=build /anova-ui/dist/anova-ui /usr/share/nginx/html

# Optionally, copy a custom Nginx configuration if you have one.
# Uncomment and adjust the line below if you want to use your own config.
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
