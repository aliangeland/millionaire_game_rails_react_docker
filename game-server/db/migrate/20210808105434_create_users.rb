class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :surname
      t.string :password_digest
      t.integer :scope, default: 1
      t.integer :score, default: 0

      t.timestamps
    end
  end
end
