# FROM ruby:2.6.3

# # install rails dependencies
# RUN apt-get clean all && apt-get update -qq && apt-get install -y build-essential libpq-dev \
#     curl gnupg2 apt-utils default-libmysqlclient-dev git libcurl3-dev cmake \
#     libssl-dev pkg-config openssl imagemagick file nodejs yarn


# RUN mkdir /web
# WORKDIR /web

# # Adding gems
# COPY Gemfile Gemfile
# COPY Gemfile.lock Gemfile.lock
# RUN gem install bundler
# RUN bundle install

# COPY . /web

# # Add a script to be executed every time the container starts.
# # COPY entrypoint.sh /usr/bin/
# # RUN chmod +x /usr/bin/entrypoint.sh
# # ENTRYPOINT ["entrypoint.sh"]

# FROM ruby:2.6.3
# RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
# RUN mkdir /web
# WORKDIR /web 
# ENV BUNDLE_PATH /web
# ENV GEM_PATH /web
# ENV GEM_HOME /web
# COPY Gemfile Gemfile
# COPY Gemfile.lock Gemfile.lock
# RUN gem install bundler
# RUN bundle install
# COPY . /web

# CMD bundle exec rails s -p 1000 -b '0.0.0.0'


# ENV APP_HOME /web
# RUN mkdir $APP_HOME
# WORKDIR $APP_HOME

# ENV BUNDLE_PATH /box
# ENV GEM_PATH /box
# ENV GEM_HOME /box

# ADD . $APP_HOME

# RUN gem install bundler
# RUN gem install tzinfo -v 1.2.2

# COPY Gemfile Gemfile

# RUN  bundle install

# ADD . /web




FROM ruby:2.6.3 
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /app
WORKDIR /app 
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN gem install bundler
ADD . /app

COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]