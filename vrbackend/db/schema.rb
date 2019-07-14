# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190714061029) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "collections", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "image_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "collections", ["image_id"], name: "index_collections_on_image_id", using: :btree
  add_index "collections", ["user_id"], name: "index_collections_on_user_id", using: :btree

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "image_id"
    t.text     "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "comments", ["image_id"], name: "index_comments_on_image_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "follows", force: :cascade do |t|
    t.integer  "following_id", null: false
    t.integer  "follower_id",  null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "follows", ["follower_id"], name: "index_follows_on_follower_id", using: :btree
  add_index "follows", ["following_id", "follower_id"], name: "index_follows_on_following_id_and_follower_id", unique: true, using: :btree
  add_index "follows", ["following_id"], name: "index_follows_on_following_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.string   "img_url"
    t.integer  "creator_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "images", ["creator_id"], name: "index_images_on_creator_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "username"
    t.string   "email"
    t.string   "password_digest"
    t.string   "profile_url"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_foreign_key "collections", "images"
  add_foreign_key "collections", "users"
  add_foreign_key "comments", "images"
  add_foreign_key "comments", "users"
end
