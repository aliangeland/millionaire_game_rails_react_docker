class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.string :title
      t.string :content
      t.integer :points

      t.timestamps
    end
  end
end
