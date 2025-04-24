class Api::CommentsController < ApplicationController
  before_action :set_post
  before_action :set_comment, only: [:update, :destroy]
  before_action :set_post, except: [:index]

  def index
    comments = Comment.all.includes(:post)
    render json: comments.as_json(include: :post)
  end  

  def create
    comment = @post.comments.build(comment_params)
    if comment.save
      render json: comment, status: :created
    else
      render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
    head :no_content
  end

  private

  def set_post
    @post = Post.find(params[:post_id])
  end

  def set_comment
    @comment = @post.comments.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
