import React, { useEffect, useState } from 'react';

const Pagination = props => {
  const dataLength = props.totalPages;
  let [currentPage, setCurrentPage] = useState(1);

  const perPage = 2;
  const numberOfPages = Math.ceil(dataLength.length / perPage);

  let buttons = [];
  const loadList = pageNumber => {
    let begin = (pageNumber - 1) * perPage;
    let end = begin + perPage;
    showList(begin, end, pageNumber);
  };
  useEffect(() => {
    loadList(1);
  }, [numberOfPages]);

  for (let i = 1; i <= numberOfPages; i++) {
    buttons.push(
      <button
        key={i}
        data-testid={'pageNumbers'}
        onClick={() => specificPage(i)}
        className={i === currentPage ? 'active' : ''}
      >
        {i}
      </button>
    );
  }
  const specificPage = selectedPageNumber => {
    loadList(selectedPageNumber);
  };
  const nextPage = () => {
    currentPage = currentPage + 1;
    loadList(currentPage);
  };

  const prevPage = () => {
    currentPage = currentPage - 1;
    loadList(currentPage);
  };

  const showList = (startNum, endNum, pageNum) => {
    const newData = dataLength.slice(startNum, endNum);
    props.perPageData(newData);
    setCurrentPage(pageNum);
  };

  return (
    <div style={{ textAlign: 'right' }}>
      <button
        data-testid={'prevButton'}
        disabled={currentPage === 1 ? true : false}
        onClick={prevPage}
      >
        prev
      </button>
      {buttons}
      <button
        data-testid={'nextButton'}
        disabled={currentPage === numberOfPages ? true : false}
        onClick={nextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
