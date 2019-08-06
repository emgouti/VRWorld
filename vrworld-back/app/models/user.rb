class User < ApplicationRecord
    has_secure_password

    has_many :collections
    has_many :images, through: :collections

    has_many :created_images, :class_name => "Images", :foreign_key => :creator_id
    

    has_many :follower_relationships, foreign_key: :following_id, class_name: 'Follow'
    has_many :followers, through: :follower_relationships, source: :follower
  
    has_many :following_relationships, foreign_key: :follower_id, class_name: 'Follow'
    has_many :following, through: :following_relationships, source: :following

    def token
        JWT.encode({ user_id: self.id }, 'secret')
    end

    def follow(user_id)
    following_relationships.create(following_id: user_id)
    end

    def unfollow(user_id)
        following_relationships.find_by(following_id: user_id).destroy
    end

    def following
        relationship = []
        Follow.all.each do |follow|
            if follow.follower_id === params[:id]
                relationship << follow
            end
        end
    end
   

      def all_images
        images = []
        images << Collection.all.find(user_id: params[:id])
    end
end
