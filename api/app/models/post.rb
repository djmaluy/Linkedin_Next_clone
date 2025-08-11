class Post < ApplicationRecord
  belongs_to :user
  has_one_base64_attached :image

  validates :message, presence: true
end
