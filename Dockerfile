FROM node:alpine as build

WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]