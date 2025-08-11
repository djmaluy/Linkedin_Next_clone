require 'stringio'
require 'base64'

class PostImageAttachService
  def initialize(post, image_data)
    @post = post
    @image_data = image_data
  end

  def call
    return unless @image_data.present?

    decoded_data = Base64.decode64(@image_data[:io])
    io = StringIO.new(decoded_data)
    io.set_encoding(Encoding::BINARY) if io.respond_to?(:set_encoding)

    @post.image.attach(
      io: io,
      filename: @image_data[:filename] || "upload.png",
      content_type: @image_data[:content_type] || "image/png"
    )
  end
end
