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

class ProfilesController < ApplicationController

  def index
      @profiles = Profile.all
  end

  def create
    @profile = Profile.new(profile_params)
  	responses = Cloudinary::Uploader.upload params[:profile][:image_url]
    if @profile.save
      render js: "window.location.href = '#{profile_path(@profile.id)}'"
    end
  end

  def show
		@profile = Profile.find params[:id]
	end


private
def profile_params
  params.require(:profile).permit(:image_url, :name, :sponsorship_url, :message)
end

end
