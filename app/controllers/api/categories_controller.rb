module Api
  class CategoriesController < ApplicationController
    def index
      render json: Category.all
    end

    def show
      category = Category.find(params[:id])
      render json: category
    end

    def create
      category = Category.new(category_params)
      if category.save
        render json: category, status: :created
      else
        render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      category = Category.find(params[:id])
      if category.update(category_params)
        render json: category
      else
        render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      category = Category.find(params[:id])
      category.destroy
      head :no_content
    end

    private

    def category_params
      params.require(:category).permit(:name, :description)
    end
  end
end
