class Collection < ApplicationRecord
  belongs_to :user
  belongs_to :image
  has_many :favorites
end
