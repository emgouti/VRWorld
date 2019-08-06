class RelationshipsController < ApplicationController
  def follow_user
    @user = User.find_by! username: params[:username]
    current_user.follow @user.id
      

  end

  def unfollow_user
    @user = User.find_by! username: params[:username]
    current_user.unfollow @user.id
     
  end
end
