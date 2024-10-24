class Partner < ApplicationRecord
  enummer materials: %i[wood carpet tiles] # { nothing: 0, wood: 1, carpet: 2, tiles: 4 }

  attr_accessor :distance

  def within_operating_radius?(value = self.distance)
    value <= operating_radius
  end
end
