import { SquareArrowLeft, SquareArrowRight } from 'lucide-react';
import { useState } from 'react';

const Pagination = ({
  totalPages,
  onPageChange,
}: {
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  const generatePages = () => {
    const pages: (number | string)[] = [];
    const pagesAround = 1;

    if (currentPage > pagesAround + 2) {
      pages.push(1, '...');
    } else {
      for (let i = 1; i < currentPage - pagesAround; i++) {
        pages.push(i);
      }
    }

    for (
      let i = Math.max(1, currentPage - pagesAround);
      i <= Math.min(totalPages, currentPage + pagesAround);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - pagesAround - 1) {
      pages.push('...', totalPages);
    } else {
      for (let i = currentPage + pagesAround + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-6">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <SquareArrowLeft
          className={`w-6 h-6 ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-800 hover:text-black'
          }`}
        />
      </button>

      <div className="flex space-x-2">
        {generatePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && goToPage(page)}
            disabled={typeof page !== 'number'}
            className={`px-3 py-1 rounded border ${
              page === currentPage
                ? 'bg-gray-800 text-white'
                : typeof page === 'number'
                ? 'bg-gray-100 text-gray-700 hover:bg-black hover:text-white'
                : 'bg-transparent text-gray-500 cursor-default'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <SquareArrowRight
          className={`w-6 h-6 ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-800 hover:text-black'
          }`}
        />
      </button>
    </div>
  );
};

export default Pagination;
