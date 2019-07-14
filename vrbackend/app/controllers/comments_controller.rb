class CommentsController < ApplicationController
    
    
    
    

    def create
        @image = Image.find(params[:image_id])
        @comment = @image.comments.create(comment_params)
        @comment.user = current_user
        @comment.save
        render json: @comment
    end

    def index
        render json: Comment.all
        
    end

    def update
        comment = Comment.all.find(params[:id])
        comment.update(comment_params)
        render json: comment
    end
    def show 
        showcomments = Comment.all.find(params[:id])
            
        render json: showcomments
    end


    def destroy
        comment = Comment.all.find(params[:id])
        if comment.user_id == current_user.id
            comment.destroy
        render json: comment
        else
            render json: { error: true, message: 'You don\'t own this comment.'}
        end
    end


    def comment_params
        params.require(:comment).permit(:image_id, :user_id, :content)
    end
end
