class CreateImages < ActiveRecord::Migration[4.2]
  def change
    create_table :images do |t|
      t.string :img_url
      t.integer :creator_id

      t.timestamps null: false
    end
    add_index :images, :creator_id
  end
end
