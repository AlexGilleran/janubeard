# == Schema Information
#
# Table name: profiles
#
#  id              :integer          not null, primary key
#  name            :string
#  image_url       :string
#  sponsorship_url :string
#  message         :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Profile < ActiveRecord::Base
end
