class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    before_action :authenticate
    skip_before_action :verify_authenticity_token
    
    

    def decode_token(token)
        JWT.decode(token, 'secret')
    end

    def current_user     
        begin 
            method, token = request.headers['Authorization'].split(' ')
            payload, header = decode_token(token)
            
            User.find(payload["user_id"])
        rescue JWT::DecodeError
            nil
        end
    end

    
    def authenticate

        if !current_user
            render json: { error: true, message: 'Please Login'}
        end
    end
   
end