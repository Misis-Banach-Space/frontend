FROM node
WORKDIR /app
COPY package.json .
RUN npm i --force
COPY . .
## EXPOSE [Port you mentioned in the vite.config file]
EXPOSE 8000
CMD ["npm", "run", "dev"]