Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  scope :api, defaults: { format: :json } do
    namespace :v1 do
      resources :users
      post 'auth/google_oauth2', to: 'auth#google_oauth2'
      resources :posts
    end
  end

end
