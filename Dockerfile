FROM ruby:2.6.5-alpine3.10
RUN apk add --no-cache make=4.2.1-r2 g++=8.3.0-r0 gcc=8.3.0-r0 libc-dev=0.7.1-r0
RUN gem install "github-pages:201"
RUN mkdir -p srv/jekyll
WORKDIR /srv/jekyll
