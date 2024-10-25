module Api
  module V1
    class PartnersController < ApplicationController
      before_action :set_partner, only: %i[show]

      # GET /api/v1/partners
      def index
        partners = Partner.all.order(:name)

        render_with_pagination partners, only: %i[id name]
      end

      # GET /api/v1/partners/:id
      def show
        render json: @partner
      end

      private

        def set_partner
          @partner = Partner.find(params.require(:id))
        end
    end
  end
end
