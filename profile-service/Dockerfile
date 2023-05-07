FROM node:latest as base

# Create app directory
WORKDIR /app

COPY package*.json ./
RUN  npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]