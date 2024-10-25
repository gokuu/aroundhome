# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_10_24_160853) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "customers", force: :cascade do |t|
    t.string "name"
    t.string "street_address", null: false
    t.string "postcode", null: false
    t.string "city", null: false
    t.string "country_code", null: false
    t.string "country", null: false
    t.float "latitude", default: 0.0, null: false
    t.float "longitude", default: 0.0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_customers_on_name", unique: true
  end

  create_table "partners", force: :cascade do |t|
    t.string "name"
    t.integer "materials"
    t.string "street_address", null: false
    t.string "postcode", null: false
    t.string "city", null: false
    t.string "country_code", null: false
    t.string "country", null: false
    t.float "latitude", default: 0.0, null: false
    t.float "longitude", default: 0.0, null: false
    t.float "operating_radius", default: 0.0, null: false
    t.integer "rating_score", default: 0, null: false
    t.integer "rating_count", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_partners_on_name", unique: true
  end
end
