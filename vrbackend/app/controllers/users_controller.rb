class UsersController < ApplicationController
    before_action :define_selected_user

    skip_before_action :authenticate, only: [ :create, :current, :images]

    def imagesandcomment
        user = User.find(params[:id])
        images = user.images
        comments = images.map do |image| image.comments end
        render json: {images: images, comments:  comments}
     end

    def images 
        user = User.find(params[:id])
        render json: user.images
    end

    def following
       
        render json: Follow.all, methods: [:following]
    end

    def create
        user = User.create(user_params)
        render json: user, methods: [ :token ]
    end
    
    def index
        render json: User.all
    end
    
    def show
        render json: selected_user
    end
    
    def update
        selected_user.update(user_params)
        render json: selected_user
    end
    
    def destroy
        selected_user.destroy
        render json: selected_user
    end
    
    def user_params
        params.permit(:username, :email, :password, :name, :profile_url, image_ids:[])
    end
    
    def define_selected_user
        if params[:id]
            @selected_user = User.find(params[:id])
        else
            @selected_user = User.new
        end
    end
    
    def selected_user
        @selected_user
    end

    

    
end