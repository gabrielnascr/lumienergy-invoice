FROM node:21-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY prisma ./prisma

COPY . .

EXPOSE 3000
RUN npx prisma generate
USER node
CMD ["yarn", "start"]
