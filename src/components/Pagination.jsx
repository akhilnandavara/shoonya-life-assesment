
import PropTypes from 'prop-types';

// props validation
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="w-fit mx-auto flex gap-4">
      <button
        className={`bg-blue-950  hover:bg-blue-900 text-white max-sm:text-xs py-2 px-4 rounded-full ${
          currentPage === 1 && "opacity-50 cursor-not-allowed"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        className={`bg-blue-950 hover:bg-blue-900 text-white  max-sm:text-xs  py-2 px-4 rounded-full ${
          currentPage === totalPages && "opacity-50 cursor-not-allowed"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
