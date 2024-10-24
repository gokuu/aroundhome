class CreateCustomers < ActiveRecord::Migration[7.2]
  def change
    create_table :customers do |t|
      t.string :name

      t.string :street_address, null: false
      t.string :postcode, null: false
      t.string :city, null: false
      t.string :country_code, null: false
      t.float :latitude, default: 0.0, null: false
      t.float :longitude, default: 0.0, null: false

      t.timestamps

      t.index :name, unique: true
    end
  end
end
