FROM node:latest
WORKDIR ./
COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

EXPOSE 3002

CMD ["node", "dist/main.js"]