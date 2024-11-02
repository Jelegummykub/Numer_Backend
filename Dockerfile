FROM node:18-alpine
WORKDIR /app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY ./prisma ./prisma
COPY ./src ./src
COPY .env ./.env

RUN npm install
RUN npm run dbgenerate

EXPOSE 4000
CMD ["npm" , "run" , "start"]