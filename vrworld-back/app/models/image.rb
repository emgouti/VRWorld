class Image < ApplicationRecord
    has_many :collections, :dependent => :delete_all
    has_many :users, through: :collections

  
  has_many :comments, :dependent => :destroy

    belongs_to :creator, :class_name => "User", :foreign_key => :creator_id

    def user=(user_id)
          user = User.find_or_create_by(user_id)
          self.user << user
        end
   
end
