module Api
  module V1
    class CustomersController < ApplicationController
      before_action :set_customer, only: %i[show match_partners]

      # GET /api/v1/customers
      def index
        customers = Customer.all.order(:name)

        render_with_pagination customers, only: %i[id name]
      end

      # GET /api/v1/customers/:id
      def show
        render json: @customer
      end

      # GET /api/v1/customers/:id/match-partners
      def match_partners
        matching_partners = Partner.with_materials(match_params)

        matching_partners = matching_partners.to_a.inject([]) do |list, partner|
          partner.distance = Haversine.distance_in_metres(partner, @customer)

          next list << partner if partner.within_operating_radius?

          list
        end.sort do |a, b|
          # If b's rating is higher, sort it first
          rating_difference = b.rating_score - a.rating_score

          # If ratings are equal, sort shortest distance first
          next rating_difference if rating_difference != 0

          a.distance - b.distance
        end

        render_with_pagination matching_partners, only: %i[id name rating_score], methods: %i[distance]
      end

      private

        def set_customer
          @customer = Customer.find(params.require(:id))
        end

        def match_params
          params.require(:materials)
        end
    end
  end
end
