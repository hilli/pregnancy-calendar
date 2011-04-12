# Pregnancy calendar
# Outputs a iCal file, given the first date of the last full menstrual period
#
# Inspired by: http://www.baby.dk/Information/Terminsberegner.aspx
# last_period_first_date: The date for the last periods start
# days_in_cycle: 28 (22-45)
# lutheal: Antal dage fra du har haft ægløsning til du får din menstruation (Default 14, 9-16)
class PregnancyCalendar

  # Notes: http://www.babycentre.co.uk/pregnancy/antenatalhealth/testsandcare/calculateduedateexpert/

  require "icalendar"
  require "date"

  include Icalendar


  attr_accessor :last_menstrual_period_first_date, :days_in_cycle, :lutheal
  attr_reader :cal
  EXPECTANCY = 38 # weeks

  def initialize(last_menstual_period_first_date)
    @cal = Calendar.new
    @last_menstrual_period_first_date = last_menstual_period_first_date
    @lutheal = 14
    @days_in_cycle = 28
  end

  def create_ical
    conception_date = @last_menstrual_period_first_date + @days_in_cycle - @lutheal
    due_date = conception_date + (EXPECTANCY * 7)
    num_day = 0
    (last_menstrual_period_first_date..(due_date+14)).each do |d|
      @cal.event do
        dtstart     d
        dtend       d+1
        summary     "Week #{num_day.divmod(7)[0]}+#{num_day.remainder(7)}"
        description "Birth in #{(due_date-d).to_i} days\n"
      end
      num_day += 1
    end
    @cal.to_ical
  end

  def save_ical(file)
    File.open(file, "w") do |f|
      f.puts @cal.to_ical
    end
  end

end
