import { useEffect, useMemo, useState } from "react";
import { faSpinner, faWarning } from "@fortawesome/free-solid-svg-icons";
import useApiRequest from "../lib/useApiRequest";
import Indicator from "./Indicator";
import { Customer, CustomersReponse } from "../types";
import Pagination from "./Pagination";

const PAGE_SIZE = 10;

interface CustomerListProps {
  onCustomerSelected?: (customer?: Customer) => void;
}

export default function CustomerList({
  onCustomerSelected,
}: CustomerListProps) {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { loading, error, data, execute } = useApiRequest<CustomersReponse>({
    url: "/customers",
  });

  const containerClassName = useMemo(
    () => (loading || error ? "justify-stretch" : "justify-start"),
    [error, loading]
  );

  useEffect(() => {
    onCustomerSelected?.(undefined);

    execute({
      queryParameters: { page_number: pageNumber, page_size: PAGE_SIZE },
    });
  }, [execute, onCustomerSelected, pageNumber]);

  useEffect(() => {
    setTotalPages(data?.total_pages ?? 0);
    setPageNumber(data?.page_number ?? 1);
  }, [data]);

  return (
    <div className={`grow flex flex-col items-stretch ${containerClassName}`}>
      {error ? (
        <Indicator icon={faWarning} message={error} />
      ) : loading ? (
        <Indicator
          icon={faSpinner}
          message="Loading customers..."
          animateIcon
        />
      ) : (
        <div className="p-2 grow flex flex-col items-stretch gap-px">
          {data?.data.map((customer) => (
            <label className="cursor-pointer flex gap-px p-2 rounded hover:bg-blue-500/25 has-[:checked]:bg-blue-500/50">
              <input
                key={`customer-${customer.id}`}
                type="radio"
                name="customer"
                className="hidden"
                onChange={() => onCustomerSelected?.(customer)}
              />
              {customer.name}
            </label>
          ))}

          <div className="flex flex-row items-stretch justify-center">
            <Pagination
              pageNumber={pageNumber}
              totalPages={totalPages}
              onPageChanged={setPageNumber}
            />
          </div>
        </div>
      )}
    </div>
  );
}
