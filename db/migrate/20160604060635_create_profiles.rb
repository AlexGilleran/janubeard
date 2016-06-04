class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.string :name
      t.string :image_url
      t.string :sponsorship_url
      t.string :message

      t.timestamps null: false
    end
  end
end
