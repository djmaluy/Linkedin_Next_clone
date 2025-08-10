class V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]

  def index
    @posts = Post.all
  end

  def show
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      render :show, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      render :show, status: :ok, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy!
  end

  private

  def set_post
    @post = Post.find(params.expect(:id))
  end

  def post_params
    params.fetch(:post, {})
  end
end
