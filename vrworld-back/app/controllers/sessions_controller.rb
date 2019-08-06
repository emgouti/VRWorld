class SessionsController < ApplicationController
    skip_before_action :authenticate
    

    def create
      
      @user = User.find_by(username: params[:username])
      if @user == nil || !@user.authenticate(params[:password])
        flash[:errors] = "Incorrect username/password"
        
      else
        session[:current_user_id] = @user.id

      end
    
    end

    def destroy
      session.delete(:user_id)
      
    end
  end