json.extract! image, :id, :img_url, :creator_id, :created_at, :updated_at
json.url image_url(image, format: :json)
