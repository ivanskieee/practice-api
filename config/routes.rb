Rails.application.routes.draw do
  namespace :api do
    resources :posts do
      resources :comments
    end
  end
end
