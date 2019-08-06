class CreateCollections < ActiveRecord::Migration[4.2]
  def change
    create_table :collections do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :image, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
