# == Schema Information
#
# Table name: pictures
#
#  id         :integer          not null, primary key
#  image      :text
#  anger      :decimal(, )
#  contempt   :decimal(, )
#  disgust    :decimal(, )
#  fear       :decimal(, )
#  happiness  :decimal(, )
#  neutral    :decimal(, )
#  sadness    :decimal(, )
#  surprise   :decimal(, )
#  created_at :datetime
#  updated_at :datetime
#



class Picture < ActiveRecord::Base
end
