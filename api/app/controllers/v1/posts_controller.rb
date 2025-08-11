class V1::PostsController < ApplicationController
  before_action :set_post, only: [:update, :destroy, :show]

  def index
    @posts = Post.includes(:user)
              .includes(image_attachment: :blob)
              .order(created_at: :desc)
  end

  def show
    render json: @post
  end

  def create
    user = find_user
    return render json: { error: "User not found" }, status: :unauthorized unless user

    post = user.posts.new(post_params.except(:image, :user_email))
    PostImageAttachService.new(post, post_params[:image]).call

    if post.save
      render json: { status: "created" }, status: :created
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      render json: { status: "updated" }, status: :ok
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy!
    head :no_content
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def find_user
    User.find_by(email: post_params[:user_email]) if post_params[:user_email].present?
  end

  def post_params
    params.require(:post).permit(:message, :user_email, :likes_count, image: [:io, :filename, :content_type])
  end
end
