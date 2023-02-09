import React from 'react';
import ReactPaginate from 'react-paginate';

function Pagination({onPageChange}) {

  return (
    <div className="pagination-wrapper">
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={event => onPageChange(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default Pagination
