class ApplicationController < ActionController::API
  protected

    def render_with_pagination(relation, options = {})
      if relation.is_a? (ActiveRecord::Relation)
        return render_relation_with_pagination relation, options
      end

      render_array_with_pagination relation, options
    end

    def pagination_params
      @pagination_params ||= begin
        params.permit(:page_number, :page_size).tap do |pagination|
          pagination[:page_number] ||= 1
          pagination[:page_size] ||= 5
        end
      end
    end

    private

      def render_relation_with_pagination(relation, options = {})
        total = relation.count

        page_size, page_number = pagination_params.values_at(:page_size, :page_number)
        paginated_relation = relation.limit(page_size)
                                    .offset((page_number.to_i - 1) * page_size.to_i)

        render json: {
          data: paginated_relation.as_json(options),
          total: total,
          page_number: page_number.to_i,
          page_size: page_size.to_i,
          total_pages: (total.to_f / page_size.to_i).ceil
        }
      end

      def render_array_with_pagination(relation, options = {})
        total = relation.count

        page_size, page_number = pagination_params.values_at(:page_size, :page_number)
        paginated_relation = relation[((page_number.to_i - 1) * page_size.to_i)...(page_number.to_i * page_size.to_i)]

        render json: {
          data: paginated_relation.as_json(options),
          total: total,
          page_number: page_number.to_i,
          page_size: page_size.to_i,
          total_pages: (total.to_f / page_size.to_i).ceil
        }
      end
end
