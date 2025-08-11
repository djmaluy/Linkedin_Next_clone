json.extract! post, :id, :message
json.set! :userId, post.user_id
json.set! :likesCount, post.likes_count
json.set! :userImageUrl, post.user.image_url
json.set! :userFullName, post.user.name
json.set! :createdAt, post.created_at

if post.image.attached?
  if post.image.service.exist?(post.image.key)
    json.imageUrl rails_blob_url(post.image)
  else
    json.imageUrl nil
    Rails.logger.warn "ActiveStorage file missing for post #{post.id}"
  end
else
  json.imageUrl nil
end
