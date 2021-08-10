class Answer < ApplicationRecord
  belongs_to :question

  def as_json(options = {})
    super(options.merge(except: %i[isCorrect]))
  end
end
