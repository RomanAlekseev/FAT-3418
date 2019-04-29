import * as React from "react";

//вычисляет номера страниц которые в данный момент должны выводится компонентом Pagination
const getPageNumbers = (currentPage, pageEnd = 8) => {
  let arr = [];
  let pageStart = 1;
  const count = pageEnd;
  while (currentPage > pageEnd) {
    pageEnd += count;
    pageStart += count;
  }
  for (pageStart; pageStart <= pageEnd; pageStart++) {
    arr.push(pageStart);
  }
  return arr;
};

export default function Pagination(props) {
  return props.lastPage < 2 ? null : (
    <nav aria-label="Page navigation mb-4">
      <ul className="pagination justify-content-center mb-5 d-flex">
        {props.currentPage < 9 ? null : (
          <li className="align-self-center mr-3 font-italic">
            <a
              href="#"
              className="pagination-control"
              onClick={props.changeCurrentPage}
            >
              to the first
            </a>
          </li>
        )}
        <li className={props.currentPage === 1 ? "page-item disabled" : "page-item"}>
          <a
            className="page-link"
            href="#"
            tab-index="-1"
            onClick={props.changeCurrentPage}>
            Previous
          </a>
        </li>
        {props.currentPage &&
          getPageNumbers(props.currentPage).map((item, index) => {
            return item <= props.lastPage ? (
              <li
                key={item}
                className={
                  item === props.currentPage ? "page-item active pagination-number" : "page-item pagination-number"
                }
              >
                <a
                  className="page-link text-center"
                  href="#"
                  onClick={props.changeCurrentPage}
                >
                  {item}
                </a>
              </li>
            ) : null;
          })}
        <li
          className={
            props.currentPage === props.lastPage
              ? "page-item disabled"
              : "page-item"
          }
        >
          <a className="page-link" href="#" onClick={props.changeCurrentPage}>
            Next
          </a>
        </li>
        {props.currentPage > props.lastPage - 8 ? null : (
          <li className="align-self-center ml-3 font-italic">
            <a
              href="#"
              className="pagination-control"
              onClick={props.changeCurrentPage}
            >
              to the last
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
