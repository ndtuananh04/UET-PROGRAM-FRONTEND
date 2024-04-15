FROM node:20-alpine

WORKDIR /react-app
COPY package*.json ./
COPY . .

RUN npm install xlsx
RUN npm install react-inject-env --save-dev
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
