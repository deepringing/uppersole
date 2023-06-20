FROM node:18-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Install app dependencies
RUN yarn

COPY . .

RUN yarn prisma generate

RUN yarn build

EXPOSE 3000
CMD [ "node", "dist/main.js" ]
