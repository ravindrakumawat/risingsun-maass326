class ChangeDataTypeForMarker < ActiveRecord::Migration
  def up
    change_table :markers do |t|
      t.change :lat, :float
      t.change :lng, :float
    end
  end

  def down
    change_table :markers do |t|
      t.change :lat, :decimal
      t.change :lng, :decimal
    end
  end
end
