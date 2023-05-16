import _ from 'lodash';
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

function Pagination(props) {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  const [value, setValue] = useState(1);
  return (
    <Row className='pt-3 pb-3'>
      <Col
        lg={1}
        xl={1}
        xs={12}
        sm={12}
        md={12}
        className='d-flex justify-content-center m-0 p-0'>
        {pages.length > 5 ? (
          <ul className='list-unstyled'>
            <PaginationActionButton
              text='previous'
              disabled={currentPage === 1}
              condition={currentPage !== 1}
              onClick={() => {
                setValue(currentPage - 1);
                onPageChange(currentPage - 1);
              }}
            />
          </ul>
        ) : null}
      </Col>
      <Col className='m-0 p-0' xs={12} sm={12} md={12} lg={4} xl={4}>
        <nav className='row justify-content-center'>
          <ul className='d-flex flex-direction-row flex-wrap justify-content-center align-items-center list-unstyled'>
            {pages.length <= 10 &&
              pages.map((page) => (
                <PaginationButton
                  key={page}
                  page={page}
                  isActive={page === currentPage}
                  onClick={() => {
                    setValue(page);
                    onPageChange(page);
                  }}
                />
              ))}
            {pages.length > 10 &&
              pages
                .filter((el) => el < 10)
                .map((page) => (
                  <PaginationButton
                    key={page}
                    page={page}
                    isActive={page === currentPage}
                    onClick={() => {
                      setValue(page);
                      onPageChange(page);
                    }}
                  />
                ))}
          </ul>
        </nav>
      </Col>
      <Col className='m-0 p-0' xs={12} sm={12} md={12} lg={3} xl={3}>
        {pages.length > 5 && (
          <nav className='row justify-content-center'>
            <ul className='d-flex flex-direction-row flex-wrap justify-content-center align-items-center list-unstyled'>
              <Row className='m-0 p-0'>
                <Col
                  className='d-flex justify-content-center m-0 p-0'
                  xs={12}
                  sm={12}
                  md={12}
                  lg={4}
                  xl={4}>
                  <PaginationActionButton
                    text={'...'}
                    disabled={true}
                    borderBttom={false}
                  />
                </Col>
                <Col
                  className='d-flex justify-content-center m-0 p-0'
                  xs={12}
                  sm={12}
                  md={12}
                  lg={4}
                  xl={4}>
                  <li className='page-item'>
                    <input
                      type='text'
                      value={value}
                      className='form-control mb-1 text-center'
                      onChange={(e) => setValue(Number(e.target.value))}
                      onKeyDown={(e) => {
                        if (
                          e.key === 'Enter' &&
                          value > 0 &&
                          value <= pagesCount
                        )
                          onPageChange(value);
                      }}
                    />
                  </li>
                </Col>
                <Col
                  className='d-flex justify-content-center m-0 p-0'
                  xs={12}
                  sm={12}
                  md={12}
                  lg={4}
                  xl={4}>
                  <PaginationActionButton
                    text={'...'}
                    disabled={true}
                    borderBttom={false}
                  />
                </Col>
              </Row>
            </ul>
          </nav>
        )}
      </Col>
      <Col className='m-0 p-0' xs={12} sm={12} md={12} lg={3} xl={3}>
        {pages.length > 10 && (
          <nav className='row justify-content-center'>
            <ul className='d-flex flex-direction-row flex-wrap justify-content-center align-items-center list-unstyled'>
              {pages
                .filter((el) => el > pages.length - 5)
                .map((page) => (
                  <PaginationButton
                    key={page}
                    page={page}
                    isActive={page === currentPage}
                    onClick={() => {
                      setValue(page);
                      onPageChange(page);
                    }}
                  />
                ))}
            </ul>
          </nav>
        )}
      </Col>
      <Col
        className='d-flex justify-content-center m-0 p-0'
        xs={12}
        sm={12}
        md={12}
        lg={1}
        xl={1}>
        <nav className='row justify-content-center'>
          {pages.length > 5 && (
            <ul className='list-unstyled'>
              <PaginationActionButton
                text='next'
                disabled={currentPage === pages[pages.length - 1]}
                condition={currentPage !== pagesCount}
                onClick={() => {
                  setValue(currentPage + 1);
                  onPageChange(currentPage + 1);
                }}
              />
            </ul>
          )}
        </nav>
      </Col>
    </Row>
  );
}

const ButtonStyle = {
  active: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9967CE',
    color: '#fff',
    width: '2rem',
    height: '2rem',
    border: 'none',
    borderRadius: '0.3rem',
    cursor: 'pointer'
  },
  nonActive: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    color: '#9967CE',
    border: 'none',
    width: '2rem',
    height: '2rem',
    borderRadius: '0%',
    cursor: 'pointer'
  }
};

const PaginationActionButton = ({
  condition,
  text,
  borderBttom = true,
  ...props
}) => (
  <li className='page-item'>
    <button
      className='page-link shadow-none'
      style={Object.assign(
        {},
        { ...ButtonStyle.nonActive },
        borderBttom &&
          (condition
            ? { borderBottom: '0.2rem solid #9967CE' }
            : {
                borderBottom: '0.2rem solid #9967CE80',
                color: '#9967CE80',
                cursor: 'auto'
              })
      )}
      {...props}>
      {text}
    </button>
  </li>
);

const PaginationButton = ({ isActive, page, onClick }) => (
  <li>
    <button
      style={isActive ? ButtonStyle.active : ButtonStyle.nonActive}
      className='page-link shadow-none'
      onClick={onClick}>
      {page}
    </button>
  </li>
);

export default Pagination;
