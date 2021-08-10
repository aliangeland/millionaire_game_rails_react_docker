# frozen_string_literal: true

class Question < ApplicationRecord
  has_many :answers
  has_many :user_questions
  has_many :users, through: :user_questions
end
