class CreateImages < ActiveRecord::Migration[5.2]
  def change
    create_table :images do |t|
      t.string :img_url
      t.integer :creator_id

      t.timestamps
    end

    add_index :images, :creator_id
  end
end
