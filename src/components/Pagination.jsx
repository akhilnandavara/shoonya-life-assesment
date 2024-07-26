
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
        className={`bg-blue-900  hover:bg-blue-800 text-white font-bold p-2 md:py-2 md:px-4 rounded-md ${
          currentPage === 1 && "opacity-50 cursor-not-allowed"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        className={`bg-blue-900 hover:bg-blue-800 text-white font-bold p-2 md:py-2 md:px-4 rounded-md ${
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
