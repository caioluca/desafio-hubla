FROM node:19-alpine AS dependencies

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

FROM node:19-alpine AS build

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npx prisma migrate dev --name init

RUN yarn build

FROM node:19-alpine AS deploy

WORKDIR /app

ENV NODE_ENV production

ENV SECRET_COOKIE_PASSWORD "--------------------------------"
ENV DATABASE_URL "file:./dev.db"

COPY --from=build /app/prisma ./prisma
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]