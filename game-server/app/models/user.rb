# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_many :user_questions
  has_many :users, through: :user_questions

  validates :name, presence: true, uniqueness: true
  validates :password, presence: true
  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :name
  validates_presence_of :surname
  validates_uniqueness_of :surname
  
  def self.authenticate(name, password)
    user =  User.find_by name: name
    if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
      user
    else
      nil
    end
  end

  def as_json(options = {})
    super(options.merge(except: %i[password_digest]))
  end
end
