Cloudinary.config do |config|
  config.cloud_name = ENV['CLOUDINARY_NAME']
  config.api_key = ENV['CLOUDINARY_KEY']
  config.api_secret = ENV['CLOUDINARY_SECRET']
  config.enhance_image_tag = true
  config.static_image_support = false
end
