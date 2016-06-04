class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
    	t.text :image
    	t.decimal :anger
    	t.decimal :contempt
    	t.decimal :disgust
    	t.decimal :fear
    	t.decimal :happiness
    	t.decimal :neutral
    	t.decimal :sadness
    	t.decimal :surprise
    	t.timestamps
    end
  end
end


