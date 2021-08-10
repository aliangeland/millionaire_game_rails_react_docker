class CreateUserQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :user_questions do |t|
      t.references :user
      t.references :question
      t.integer :points
      t.timestamps
    end
  end
end
