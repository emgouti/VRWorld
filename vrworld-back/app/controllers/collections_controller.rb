class CollectionsController < ApplicationController
    before_action :current_user 

    def images
        collection = []
        Collection.all.each do |c|
           if(c.user_id === params[:id])
            collection << c.image_id
         end
        end

        
        collection.map do |c|
           return Image.all.find(c)
        end
        render json: collection
    end

    def create
        collection = Collection.create(collection_params)
        # image = Image.last
        
        render json: collection
    end

    def index
        render json: Collection.all
    end

    def show 
        showcollection = Collection.all.find_by(user_id: params[:user_id])
            
        render json: showcollection
    end

    def destroy
        collection = Collection.all.find_by(user_id: current_user.id, image_id: params[:id])
        collection.destroy
        render json: collection
    end

    def define_current_collection
        if params[:id]
            @current_collection = Collection.find(params[:id])
        else
            @current_collection = Collection.new
        end
    end

    def current_collection
        @current_collection
    end

    def collection_params
        params.require(:collection).permit(:user_id, :image_id)
    end
end
