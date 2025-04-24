Rails.application.routes.draw do
  namespace :api do
    post "login", to: "sessions#create"
    
    resources :users, only: [:create] 

    resources :posts do
      resources :comments
    end

    resources :comments, only: [:index]
  end
end
