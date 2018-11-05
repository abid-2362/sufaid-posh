# beware, this app use bcrypt for encryption of passwords, so
# don't copy node_modules in it, always install packages inside
# the container to avoid "elf header" error from bcrypt.
# https://stackoverflow.com/a/37561258

FROM node:8-alpine

LABEL author="Abid Ali<daegctfsd@gmail.com>"

# Change working directory
WORKDIR /app/src

# Copy Package.json file separately to create a separate layer for package.json
# it will make sure not to run npm install on each change of even a single line of code
# it will run npm install only if package.json itself was modified.
COPY package.json .

# Install Dependencies
RUN npm install

# Copy files into app directory
COPY . .

# Rebuild bcrypt inside the docker container.
RUN apk update && apk upgrade \
	&& apk --no-cache add --virtual builds-deps build-base python \
	&& npm install -g node-gyp node-pre-gyp \
	&& npm rebuild bcrypt --build-from-source

# The web process must listen for HTTP traffic on $PORT, which is set by Heroku. EXPOSE in Dockerfile is not respected, but can be used for local testing. Only HTTP requests are supported.
EXPOSE 5000

# ENTRYPOINT [ "node", "server/server.js" ]
CMD node server/server.js