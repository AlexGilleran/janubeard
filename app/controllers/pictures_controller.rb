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

class PicturesController < ApplicationController

	def index
  		@pictures = Picture.all
	end 
	
	def create
  		@picture = Picture.new picture_params
  		responses = Cloudinary::Uploader.upload params[:picture][:image] 
  		@image1 = responses["url"] 

  		r = HTTParty.post("https://api.projectoxford.ai/emotion/v1.0/recognize", :headers => { "Content-Type" => "application/json", "Ocp-Apim-Subscription-Key" => "043cf24268dc4468b1a056991cb1b70f" }, :body => {"url" => @image1 }.to_json)
  		if r.blank?
			render js: "window.alert('This picture has no faces please retake photo');"
		elsif r.length > 1
			render js: "window.alert('Only one face is allowed, please retake photo');"
		else
			@picture.image = responses["url"] 
		    @picture.anger = r[0]['scores']['anger']
			@picture.contempt  = r[0]['scores']['contempt']
			@picture.disgust  = r[0]['scores']['disgust']
			@picture.fear  = r[0]['scores']['fear']
			@picture.happiness  = r[0]['scores']['happiness']
			@picture.neutral = r[0]['scores']['neutral']
			@picture.sadness = r[0]['scores']['sadness']
			@picture.surprise = r[0]['scores']['surprise']
			
			@picture.save

			render js: "window.location.href = '#{picture_path(@picture.id)}'"
		end

    end 

	def show
		@picture = Picture.find params[:id]
	end



	private
	def picture_params
		params.require(:picture).permit(:id, :image, :anger, :contempt, :disgust, :fear, :happiness, :neutral, :sadness, :surprise)
	end
end



