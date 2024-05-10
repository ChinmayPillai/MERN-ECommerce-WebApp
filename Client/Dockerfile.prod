FROM node:18.16-alpine as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80
COPY ./nginx_prod.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

