FROM alpine:latest

LABEL author="Abid Ali<daegctfsd@gmail.com>"

# install Node and NPM
RUN apk add --update nodejs nodejs-npm

# Copy files into app directory
COPY . /app

# Change working directory
WORKDIR /app

# Install Dependencies
RUN npm install

# The web process must listen for HTTP traffic on $PORT, which is set by Heroku. EXPOSE in Dockerfile is not respected, but can be used for local testing. Only HTTP requests are supported.
EXPOSE 5000

# ENTRYPOINT [ "node", "server/server.js" ]
CMD node server/server.js