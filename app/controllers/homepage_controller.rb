class HomepageController < ApplicationController
	def index
	end

	def letsencrypt
		render text: "#{homepage_params[:id]}.#{ENV["LETSENCRYPT_RESPONSE"]}"
	end

	private
	def homepage_params
		params.permit(:id)
	end
end
