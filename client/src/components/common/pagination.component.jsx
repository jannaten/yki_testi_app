import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav className="row justify-content-center">
      <ul className="d-flex flex-direction-row flex-wrap justify-content-center align-items-center list-unstyled">
        {pages.map((page) => (
          <li key={page}>
            <button
              style={
                page === currentPage
                  ? {
                      backgroundColor: "#9967CE",
                      color: "#fff",
                      width: "2rem",
                      height: "2rem",
                      border: "none",
                      borderRadius: "0.3rem",
                      cursor: "pointer",
                    }
                  : {
                      backgroundColor: "#fff",
                      color: "#9967CE",
                      border: "none",
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "0.3rem",
                      cursor: "pointer",
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
