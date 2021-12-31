FROM node:alpine

WORKDIR /usr/src/e-commerce-back-end

COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install

COPY ./ .

CMD ["yarn", "start"]