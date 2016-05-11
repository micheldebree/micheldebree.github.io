FROM centos
MAINTAINER Michel de Bree <michel@micheldebree.nl>
RUN yum install -y ruby ruby-devel gcc make epel-release nodejs npm
RUN gem install jekyll
