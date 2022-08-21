import React from "react";

const Pagination = ({
  currentPage,
  itemsPerPage,
  itemsLength,
  onPageChanged,
}) => {
  // Calaculate page count
  const totalPages = Math.ceil(itemsLength / itemsPerPage) || 1;

  // Calculate all pages
  let pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination pagination-sm">
        <li className={"page-item" + (currentPage === 1 && " disabled")}>
          <button
            className="page-link"
            onClick={() => onPageChanged(currentPage - 1)}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {pageNumbers.map((number, index) => (
          <li
            key={index}
            className={"page-item" + (number === currentPage && " active")}
          >
            <button className="page-link" onClick={() => onPageChanged(number)}>
              {number}
            </button>
          </li>
        ))}
        <li
          className={"page-item" + (currentPage === totalPages && " disabled")}
        >
          <button
            className="page-link"
            onClick={() => onPageChanged(currentPage + 1)}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

Pagination.getData = (items, itemsPerPage, currentPage) => {
  const start = currentPage * itemsPerPage - itemsPerPage;
  return items.slice(start, start + itemsPerPage);
};

export default Pagination;
