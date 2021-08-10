# frozen_string_literal: true

require 'json'

class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      payload = { user_id: user.id }
      token = encode(payload)
      render json: { user: user, token: token, success: 'Welcome!' }
    else
      render json: { user: user, token: token, success: 'Oops! something went wrong' }
    end
  end

  def login
    user = User.where(name: params[:name]).first
    if user&.authenticate(params[:password])
      payload = { user_id: user.id }
      token = encode(payload)
      render json: { user: user, token: token, success: "Welcome back, #{user.name}" }, status: 200
    else
      render json: { failure: 'Login failed! name or password must be wrong!' }, status: 401
    end
  end

  def check_token
    user = find_user_by_token
    render json: user
  rescue StandardError
    render json: { failure: 'Invalid Token' }
  end

  def play
    answer_id = params[:answer_id]

    @answer = Answer.find(answer_id)
    if !@answer
      return render json: { 'failure' => 'Your selected answer does not exist!' }, status: 400
    end
    
    @user = find_user_by_token
    unless @user
      return render json: { 'failure' => 'You are not authenticated!' }, status: 400
    end

    userQuestionCount = UserQuestion.where(user_id: @user.id).where(question_id: @answer.question_id).count
    if userQuestionCount > 0
      return render json: { 'failure' => 'You have already answered this question!' }, status: 400
    end

    @question = Question.find(@answer.question_id)

    points = 0
    message = 'Wrong answer!'
    if @answer.isCorrect
      points = @question.points
      message = "Excellent! you've got #{points} points"
    end

    @question_user = Question.find(@answer.question_id).user_questions.create(user_id: @user.id, points: points)
    @user.score += points
    @user.save!(validate: false)

    render json: { 'message' => message, 'points': points, 'question_id': @question.id }, status: 200
  end

  private

  def find_user_by_token
    user = User.find(decode(token)['user_id'])
  end

  def api_params
    params.permit(:user_id, :question_id, :answer_id)
  end

  def user_params
    params.permit(:name, :surname, :password)
  end
end
