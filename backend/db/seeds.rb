require 'faker'

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Partner.destroy_all

# These values are used to place all the points roughly inside Germany
LATITUDE_RANGE = 6.284053..14.014530
LONGITUDE_RANGE = 47.638179..53.590240

def random_latitude
  Faker::Number.within range: LATITUDE_RANGE
end

def random_longitude
  Faker::Number.within range: LONGITUDE_RANGE
end

100.times do |i|
  Partner.create! do |p|
    address = Faker::Address.full_address_as_hash(:full_address, :postcode, :city, :country_code, :country)

    p.name = Faker::Company.unique.name

    p.materials << :wood if Faker::Number.within(range: 1..2).even?
    p.materials << :carpet if Faker::Number.within(range: 1..2).even?
    p.materials << :tiles if Faker::Number.within(range: 1..2).even?

    p.street_address = address[:full_address]
    p.postcode = address[:postcode]
    p.city = address[:city]
    p.country_code = address[:country_code]
    p.country = address[:country]
    p.latitude = random_latitude
    p.longitude = random_longitude
    p.operating_radius = Faker::Number.within(range: 10.0e3..1000.0e3) # metres
    p.rating_score = Faker::Number.within(range: 0..5)
    p.rating_count = Faker::Number.within(range: 1..1000)
  end
end

# Min ,
# Max ,

100.times do |i|
  Customer.create! do |c|
    address = Faker::Address.full_address_as_hash(:full_address, :postcode, :city, :country_code, :country)

    c.name = Faker::Name.unique.name

    c.street_address = address[:full_address]
    c.postcode = address[:postcode]
    c.city = address[:city]
    c.country_code = address[:country_code]
    c.country = address[:country]
    c.latitude = random_latitude
    c.longitude = random_longitude
  end
end
