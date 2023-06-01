FROM debian:buster-slim
LABEL maintainer="NGINX Docker Maintainers <docker-maint@nginx.com>"
ENV NGINX_VERSION 1.21.1
ENV NJS_VERSION 0.6.1
ENV PKG_RELEASE 1~buster
RUN apt-get update \
&& apt-get install -y nginx \
&& apt-get clean
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
&& ln -sf /dev/stderr /var/log/nginx/error.log
COPY * /var/www/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]