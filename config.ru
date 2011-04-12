# Rack configuration file

# test with
# rackup config.ru
# http://localhost:9292/
require 'rubygems'
require 'sinatra'

set :views, File.join(File.dirname(__FILE__),'views')
set :run, false
set :environment, :production
set :raise_errors, true

# Logging
#log = File.new("#{File.dirname(__FILE__)}/log/sinatra.log", "a")
#STDOUT.reopen(log)
#STDERR.reopen(log)

require "#{File.dirname(__FILE__)}/pregnancy-calendar-web.rb"
run Sinatra::Application
