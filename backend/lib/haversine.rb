# Formula for calculating the distance between two coordinates obtained from (Haversine)
# https://www.movable-type.co.uk/scripts/latlong.html
#
# Haversine formula: a = sin²(Δφ/2) + cos φ1 * cos φ2 * sin²(Δλ/2)
#                    c = 2 * atan2( √a, √(1−a) )
#                    d = R * c
# where: φ is latitude,
#        λ is longitude
#        R is earth’s radius (mean radius = 6,371km)
module Haversine
  class << self
    EARTH_RADIUS = 6_371_000 # metres

    # Calculate the distance between two coordinates, using the Haversine formula.
    # Both `from` and `to` must behave like an hash containing keys `:latitude` and `:longitude`
    def distance_in_metres(from, to)
      raise ArgumentError, "`from` must contain `latitude` and `longitude` keys" if from[:latitude].nil? || from[:longitude].nil?
      raise ArgumentError, "`to` must contain `latitude` and `longitude` keys" if to[:latitude].nil? || to[:longitude].nil?

      latitude1 = coordinate_to_radians(from[:latitude])
      latitude2 = coordinate_to_radians(to[:latitude])

      delta_latitude = coordinate_to_radians(to[:latitude] - from[:latitude])
      delta_longitude = coordinate_to_radians(to[:longitude] - from[:longitude])


      arc = Math.sin(delta_latitude / 2.0) ** 2 +
            Math.cos(latitude1) * Math.cos(latitude2) * Math.sin(delta_longitude / 2.0) ** 2

      chord = 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1 - arc))

      EARTH_RADIUS * chord
    end

    private

      def coordinate_to_radians(coordinate)
        coordinate * Math::PI / 180
      end
  end
end
