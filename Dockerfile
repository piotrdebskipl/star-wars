FROM node:22-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]
COPY ./src ./src
RUN npm install
CMD [ "npm", "run", "dev" ]