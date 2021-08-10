# frozen_string_literal: true

class QuestionsController < ApplicationController
  def index
    @answered_questions = UserQuestion.where(user_id: params[:user_id])
    answered_question_ids = []
    @answered_questions.each do |item|
      answered_question_ids.push(item.question_id)
    end
    @remaining_questions = Question.where.not(id: answered_question_ids).includes(:answers).sample(5).to_json(include: :answers)
    render json: @remaining_questions
  end

  def show
    @question = Question.includes(:answers).find(params[:id]).to_json(include: :answers)
    render json: @question
  end

  def create
    @question = Question.create(
      title: params[:title],
      content: params[:content],
      points: params[:points]
    )
    render json: @question
  end

  def update
    @question = Question.find(params[:id])
    @question.update(
      title: params[:title],
      content: params[:content],
      points: params[:points]
    )
    render json: @question
  end

  def destroy
    @questions = Question.all
    @question = Question.find(params[:id])
    @question.destroy
    render json: @questions
  end
end
