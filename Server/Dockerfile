FROM node:9-alpine

WORKDIR /usr/src/app
COPY package.json .
RUN npm install -g yarn
RUN yarn
COPY . .

EXPOSE 3000 
CMD ["npm", "start"] 