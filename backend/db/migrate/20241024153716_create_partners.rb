class CreatePartners < ActiveRecord::Migration[7.2]
  def change
    create_table :partners do |t|
      t.string :name
      t.integer :materials

      t.string :street_address, null: false
      t.string :postcode, null: false
      t.string :city, null: false
      t.string :country_code, null: false
      t.string :country, null: false
      t.float :latitude, default: 0.0, null: false
      t.float :longitude, default: 0.0, null: false

      t.float :operating_radius, default: 0.0, null: false
      t.integer :rating_score, default: 0, null: false
      t.integer :rating_count, default: 0, null: false

      t.timestamps

      t.index :name, unique: true
    end
  end
end
