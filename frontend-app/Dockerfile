# base image
FROM node:latest

# create & set working directory
RUN mkdir -p /frontend-app/app
WORKDIR /frontend-app/app

# copy source files
COPY . /frontend-app/app

# start app
RUN npm install
RUN npm run build
EXPOSE 3000
CMD npm run start