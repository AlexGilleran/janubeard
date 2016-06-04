# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Profile.destroy_all
p1 = Profile.create( name: 'John Doe', image_url: 'http://worldhistory.mrdonn.org/powerpoints/occupations_pirate.gif', message: "gimme money" )
