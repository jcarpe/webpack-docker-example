FROM node:6.0.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

EXPOSE 8080
EXPOSE 3000

CMD npm run build:docker
