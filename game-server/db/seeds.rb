# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# require 'bcrypt'

30.times do
  @question = Question.create(
    title: Faker::Lorem.sentence(word_count: 2, supplemental: false, random_words_to_add: 2),
    content: Faker::Lorem.question(word_count: 6, supplemental: true, random_words_to_add: 10),
    points: Faker::Number.between(from: 5, to: 25)
  )
end

questions = Question.all

questions.each do |question|
  len = Faker::Number.between(from: 3, to: 5)
  len.times do |i|
    isCorrect = false
    @correctAnswerCount = Answer.where(['question_id = :question_id and isCorrect = :isCorrect', { question_id: question.id, isCorrect: true }]).count
    if @correctAnswerCount == 0
      isCorrect = Faker::Boolean.boolean(true_ratio: 0.4)
    end

    isCorrect = true if i == len - 1 && @correctAnswerCount == 0

    Answer.create(
      content: Faker::Lorem.sentence(word_count: 4, supplemental: true, random_words_to_add: 2),
      isCorrect: isCorrect,
      question_id: question.id
    )
  end
end


User.create(
  name: ENV['ADMIN_NAME'],
  surname: ENV['ADMIN_SURNAME'],
  password: ENV['ADMIN_PASSWORD'],
  score: 0,
  scope: 999
)