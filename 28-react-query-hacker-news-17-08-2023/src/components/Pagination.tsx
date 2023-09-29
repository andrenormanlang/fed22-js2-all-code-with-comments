import React from 'react';
import Button from 'react-bootstrap/Button';

interface PaginationProps {
  page: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <nav aria-label="Search results pagination">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${!hasPreviousPage && 'disabled'}`}>
          <Button
            className="page-link"
            onClick={onPreviousPage}
            disabled={!hasPreviousPage}
          >
            Previous
          </Button>
        </li>
        <li className="page-item">
          <span className="page-link">
            Page {page + 1} of {totalPages}
          </span>
        </li>
        <li className={`page-item ${!hasNextPage && 'disabled'}`}>
          <Button
            className="page-link"
            onClick={onNextPage}
            disabled={!hasNextPage}
          >
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
