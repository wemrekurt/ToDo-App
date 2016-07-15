class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.text :title
      t.boolean :state

      t.timestamps null: false
    end
  end
end
