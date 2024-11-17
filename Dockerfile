FROM node:18 as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# Use a lightweight Nginx image to serve the build output
FROM nginx:stable-alpine

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
