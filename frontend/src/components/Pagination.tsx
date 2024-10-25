interface PaginationProps {
  pageNumber: number;
  totalPages: number;
  onPageChanged: (page: number) => void;
}

interface PageProps {
  page: number;
  onClick?: (page: number) => void;
  label: string;
  disabled?: boolean;
}

function Page({ page, label, disabled, onClick }: PageProps) {
  return (
    <button
      className="h-10 px-2 m-auto bg-slate-800/75 rounded hover:bg-slate-800/50 disabled:bg-slate-800/25 disabled:text-white/25"
      onClick={() => onClick?.(page)}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default function Pagination({
  pageNumber,
  totalPages,
  onPageChanged,
}: PaginationProps) {
  return (
    <div className="flex flex-row gap-2">
      <Page
        page={1}
        label="First"
        disabled={pageNumber === 1}
        onClick={onPageChanged}
      />
      <Page
        page={pageNumber - 1}
        label="Previous"
        disabled={pageNumber === 1}
        onClick={onPageChanged}
      />
      <div className="flex items-center mx-4">
        {pageNumber}/{totalPages}
      </div>
      <Page
        page={pageNumber + 1}
        label="Next"
        disabled={pageNumber === totalPages}
        onClick={onPageChanged}
      />
      <Page
        page={totalPages}
        label="Last"
        disabled={pageNumber === totalPages}
        onClick={onPageChanged}
      />
    </div>
  );
}
