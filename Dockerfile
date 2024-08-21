# 1st step: The build

# Here we state that we will be using the node 16.10 version as the base image
FROM node:20-slim as build
# We define /app as our working directory -where our incoming commands will be executed-
WORKDIR /app

# We copy our package.json and yarn.lock (adapt if you are using npm to package-lock.json) into our workdir
COPY package.json ./
COPY yarn.lock ./

# We install our dependencies
RUN yarn
# We install react-scripts globally to avoid any bad surprise
RUN yarn add react-scripts@3.4.1 -g

# COPY our app
COPY . ./

# And we build! -yarn comes with the node:16.10 image-
RUN yarn run build


# Always good to repeat, we use nginx:stable-alpine as our base image
FROM nginx:stable-alpine
# Taking advantages from docker multi-staging, we copy our newly generated build from /app to the nginx html folder -entrypoint of the webserver-
COPY --from=build /app/dist /usr/share/nginx/html
# We copy the nginx conf file from our machine to our image
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# We expose the port 80 of the future containers
EXPOSE 80
# And finally we can run the nginx command to start the server
CMD ["nginx", "-g", "daemon off;"]