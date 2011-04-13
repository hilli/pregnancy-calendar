#!/usr/bin/env ruby

require "rubygems"
require File.join(File.dirname(__FILE__), "/lib/pregnancy-calendar")
require "sinatra"
require "cgi"
require "erb"

# Please cache everything
#before do
#  cache_control :public
#  last_modified Date.new(2011,4,12)
#end

mime_type :ics, "text/calendar"

get "/" do
  erb :index
end

get "/ical/:year/:month/:day/*" do
  content_type :ics
  printdate = sprintf("%4d%02d%02d",params[:year],params[:month],params[:day])
  attachment "pregnancy-calendar-#{printdate}.ics"
  date = Date.new(params['year'].to_i,params['month'].to_i,params['day'].to_i)
  p = PregnancyCalendar.new(date)
  if params.has_key?('splat')
    splat = params['splat'][0].split("/")
    p.days_in_cycle = splat[0].to_i
    if splat.size == 2
      p.luteal = splat[1].to_i
    end
  end
  p.create_ical
end
