#!/bin/bash
bundle install --jobs 20 --retry 5

if [ -f tmp/pids/server.pid ]; then
  rm tmp/pids/server.pid
fi

bundle exec rake db:environment:set RAILS_ENV=development
bundle exec rake db:create
bundle exec rake db:migrate
bundle exec rake db:seed

bundle exec rails s -b 0.0.0.0