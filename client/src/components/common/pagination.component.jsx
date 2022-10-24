import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav className="row justify-content-center">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            // className={page === currentPage ? "page-item active" : "page-item"}
          >
            <button
              style={
                page === currentPage
                  ? {
                      backgroundColor: "#9967CE",
                      color: "#fff",
                      border: "none",
                      borderRadius: "0.3rem",
                    }
                  : {
                      backgroundColor: "#fff",
                      color: "#9967CE",
                      border: "none",
                      borderRadius: "0.3rem",
                    }
              }
              className="page-link shadow-none"
              onClick={() => props.onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
