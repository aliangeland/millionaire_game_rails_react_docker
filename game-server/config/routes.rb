# frozen_string_literal: true

Rails.application.routes.draw do
  scope(path: '/api') do
    resources :users, only: [:create]
   
    resource :users do
      post '/login', to: 'users#login'
      get '/login', to: 'users#check_token'
      post :play
    end

    resources :answers
    resources :questions, only: %i[index show create update destroy]
  end
end
