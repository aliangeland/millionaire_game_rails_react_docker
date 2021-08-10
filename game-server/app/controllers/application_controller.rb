# frozen_string_literal: true

class ApplicationController < ActionController::API
  def jwt_key
    ENV['JWT_SECRET']
  end

  def encode(payload)
    JWT.encode(payload, jwt_key, 'HS256')
  end

  def decode(token)
    JWT.decode(token, jwt_key, true, algorithm: 'HS256')[0]
  rescue JWT::DecodeError
    [{ error: 'Invalid Token' }]
  end

  def token
    request.headers['Authorization']
  end

  def user_id
    decode.first['user_id']
  end

  def current_user
    @user ||= User.find_by(id: user_id)
  end

  def logged_in?
    !!current_user
  end
end
