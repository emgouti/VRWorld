Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :comments
  get 'relationships/follow_user'
  get 'relationships/unfollow_user'

  match 'users/:id/images' => 'users#images', :via => [:get]
  match 'collections/:id/images' => 'collections#images', :via => [:get, :post]
  post ':username/follow_user', to: 'relationships#follow_user', as: :follow_user
  post ':username/unfollow_user', to: 'relationships#unfollow_user', as: :unfollow_user
  get 'users/following/:id', to: 'users#following', as: :following
  get '/:id/imagesandcomment', to: 'users#imagesandcomment', as: :imagesandcomment
  resources :relationships
  resources :collections
  resources :images
  resources :users
  resources :auth
end
