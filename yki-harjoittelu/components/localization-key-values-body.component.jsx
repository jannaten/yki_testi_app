//importing libraries
import { useTheme } from 'styled-components';
import { Table, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { XDiamondFill, BookHalf } from 'react-bootstrap-icons';
import React, { useState, useEffect, useCallback } from 'react';
import { Container, InputGroup, Col, Card } from 'react-bootstrap';
import { BookmarkCheckFill, PencilFill } from 'react-bootstrap-icons';
//importing utiles, components, redux and styles
// import { useScrollToTop } from '../hooks';
import Loader from './common/loader.component';
import { LocalizationTitleCount } from '../styles';
import { errorToast } from './common/toast.component';
import Pagination from './common/pagination.component';
import { loadFilteredTranslations } from '../redux/slices';
import { openModal, userWordUpdate } from '../redux/slices';
import { PrimaryButton, PrimaryRowButton } from '../styles';
import LocalizationEditModal from './modals/localization-edit.modal';
import LocalizationDeleteModal from './modals/localization-delete-modal';
import { LoaderHolder, LocalizationEditorButtonsHolder } from '../styles';

function LocalizationKeyValueBody() {
  const { width } = useTheme();
  const dispatch = useDispatch();
  const [pageSize] = useState(25);
  const [sliderView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInputValue, setSearchInputValue] = useState('');

  const { user } = useSelector(({ user }) => user);
  const { translations, languages, userWords, count } = useSelector(
    ({ localization }) => localization
  );

  useEffect(() => {
    let timeoutId;
    if (searchInputValue) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(
          loadFilteredTranslations({
            text: searchInputValue
          })
        );
      }, 300);
    } else {
      dispatch(
        loadFilteredTranslations({
          pageNumber: currentPage,
          pageSize
        })
      );
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentPage, searchInputValue]);

  const isPrevilegedUser = user?.type === 'admin' || user?.type === 'teacher';

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [currentPage]
  );

  const onSubmitStudy = async (data) => {
    try {
      await dispatch(
        userWordUpdate({
          data,
          token: localStorage.token,
          operation: 'add_or_modify'
        })
      );
    } catch (error) {
      errorToast(error.message);
    }
  };
  // useScrollToTop(currentPage);
  const itemsCount = searchInputValue ? translations.length : count;

  console.log(translations);
  return (
    <div>
      <LocalizationTitleCount>
        {itemsCount} {itemsCount > 1 ? 'translations' : 'translation'} found
      </LocalizationTitleCount>
      <InputGroup className='mb-3'>
        <Form.Control
          aria-describedby='basic-addon2'
          aria-label='search translations'
          placeholder='search translations'
          onChange={(e) => {
            setSearchInputValue(e.target.value);
            setCurrentPage(1);
          }}
        />
        <PrimaryButton variant='' id='basic-addon2'>
          search
        </PrimaryButton>
      </InputGroup>
      <Container className='text-center'>
        <Pagination
          pageSize={pageSize}
          itemsCount={itemsCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Container>
      {translations?.length > 0 ? (
        <>
          {width <= 992 ? (
            <div>
              <Row
                style={{ borderBottom: '0.1rem solid black' }}
                className='mb-2 p-0'>
                {languages.length > 0 &&
                  languages.map(({ _id, name, locale }) => (
                    <Col
                      xs={6}
                      sm={6}
                      md={6}
                      key={_id}
                      className='d-flex align-items-center justify-content-center'>
                      {locale} ({name})
                    </Col>
                  ))}
              </Row>
              {translations.map((translation) => (
                <Card className='mt-3 mb-3' key={translation._id}>
                  <Card.Header>
                    <Row>
                      {languages?.length > 0 &&
                        languages.map((locales) => (
                          <Col
                            xs={6}
                            sm={6}
                            md={6}
                            key={locales._id}
                            className='d-flex align-items-center justify-content-center flex-wrap'>
                            {translation.locale_values.length > 0 &&
                              translation.locale_values.map(
                                ({ language, name }) => (
                                  <React.Fragment key={`${language}-${name}`}>
                                    {locales.locale === language.locale && name}
                                  </React.Fragment>
                                )
                              )}
                          </Col>
                        ))}
                    </Row>
                  </Card.Header>
                  <div className='d-flex align-items-center justify-content-center flex-wrap mb-2 mt-2'>
                    <PrimaryRowButton
                      variant=''
                      className='ms-1 me-1'
                      disabled={
                        !user ||
                        userWords?.some(
                          (el) =>
                            (el?.wordId === translation._id ||
                              el?.wordId._id === translation._id) &&
                            el?.count === 10 &&
                            el?.type === 'memorized'
                        )
                      }
                      onClick={() => onSubmitStudy({ id: translation._id })}
                      outline={
                        user
                          ? userWords?.some(
                              (el) =>
                                (el?.wordId === translation._id ||
                                  el?.wordId._id === translation._id) &&
                                el?.count < 10 &&
                                el?.type === 'study'
                            )
                          : 'false'
                      }>
                      <BookHalf width={20} height={20} />
                    </PrimaryRowButton>
                    <PrimaryRowButton
                      variant=''
                      className='ms-1 me-1'
                      onClick={() => onSubmitStudy({ id: translation._id })}
                      disabled={
                        !user ||
                        userWords.length === 0 ||
                        (userWords?.some(
                          (el) =>
                            el?.wordId !== translation._id ||
                            el?.wordId._id !== translation._id
                        ) &&
                          !userWords?.some(
                            (el) =>
                              (el?.wordId === translation._id ||
                                el?.wordId._id === translation._id) &&
                              el?.count === 10 &&
                              el?.type === 'memorized'
                          ))
                      }
                      outline={
                        user
                          ? userWords?.some(
                              (el) =>
                                (el?.wordId === translation._id ||
                                  el?.wordId._id === translation._id) &&
                                el?.count === 10 &&
                                el?.type === 'memorized'
                            )
                          : 'false'
                      }>
                      <BookmarkCheckFill width={20} height={20} />
                    </PrimaryRowButton>
                    {isPrevilegedUser && (
                      <PrimaryRowButton
                        variant=''
                        className='ms-1 me-1'
                        onClick={() =>
                          dispatch(
                            openModal({
                              content: (
                                <LocalizationEditModal
                                  translation={translation}
                                />
                              )
                            })
                          )
                        }>
                        <PencilFill />
                      </PrimaryRowButton>
                    )}
                    {user?.type === 'admin' && (
                      <PrimaryRowButton
                        variant=''
                        className='ms-1 me-1'
                        onClick={() =>
                          dispatch(
                            openModal({
                              content: (
                                <LocalizationDeleteModal
                                  translation={translation}
                                />
                              )
                            })
                          )
                        }>
                        <XDiamondFill width={20} height={20} />
                      </PrimaryRowButton>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Table size='lg' responsive={width < 992} hover>
              <thead>
                <tr
                  style={width < 992 ? { width: '100vw' } : {}}
                  className={
                    width < 992 ? 'd-flex flex-column text-center' : ''
                  }>
                  {width >= 992 && user?.type === 'admin' && <th>keys</th>}
                  {languages.length > 0 &&
                    languages.map(({ _id, name, locale }) => (
                      <th key={_id}>
                        {locale} ({name})
                      </th>
                    ))}
                  {width >= 992 && <th className='ms-auto'></th>}
                </tr>
              </thead>
              <tbody>
                {translations.length > 0 &&
                  translations.map((translation) => (
                    <tr key={translation._id}>
                      {user?.type === 'admin' && <td>{translation.key}</td>}
                      {!sliderView &&
                        languages?.length > 0 &&
                        languages.map((locales) => (
                          <td key={locales._id}>
                            <>
                              {translation.locale_values.length > 0 &&
                                translation.locale_values.map(
                                  ({ language, name }, index) => (
                                    <span key={index}>
                                      {locales.locale === language.locale &&
                                        name}
                                    </span>
                                  )
                                )}
                            </>
                          </td>
                        ))}
                      <LocalizationEditorButtonsHolder>
                        {isPrevilegedUser && (
                          <PrimaryButton
                            variant=''
                            onClick={() =>
                              dispatch(
                                openModal({
                                  content: (
                                    <LocalizationEditModal
                                      translation={translation}
                                    />
                                  )
                                })
                              )
                            }>
                            Edit
                          </PrimaryButton>
                        )}
                        <PrimaryRowButton
                          variant=''
                          className='ms-3'
                          disabled={
                            !user ||
                            userWords?.some(
                              (el) =>
                                (el?.wordId === translation._id ||
                                  el?.wordId._id === translation._id) &&
                                el?.count === 10 &&
                                el?.type === 'memorized'
                            )
                          }
                          onClick={() => onSubmitStudy({ id: translation._id })}
                          outline={
                            user
                              ? userWords?.some(
                                  (el) =>
                                    (el?.wordId === translation._id ||
                                      el?.wordId._id === translation._id) &&
                                    el?.count < 10 &&
                                    el?.type === 'study'
                                )
                              : 'false'
                          }>
                          <BookHalf width={20} height={20} />
                        </PrimaryRowButton>
                        <PrimaryRowButton
                          variant=''
                          className='ms-3'
                          disabled={
                            !user ||
                            userWords.length === 0 ||
                            (userWords?.some(
                              (el) =>
                                el?.wordId !== translation._id ||
                                el?.wordId._id !== translation._id
                            ) &&
                              !userWords?.some(
                                (el) =>
                                  (el?.wordId === translation._id ||
                                    el?.wordId._id === translation._id) &&
                                  el?.count === 10 &&
                                  el?.type === 'memorized'
                              ))
                          }
                          onClick={() => onSubmitStudy({ id: translation._id })}
                          outline={
                            user
                              ? userWords?.some(
                                  (el) =>
                                    (el?.wordId === translation._id ||
                                      el?.wordId._id === translation._id) &&
                                    el?.count === 10 &&
                                    el?.type === 'memorized'
                                )
                              : 'false'
                          }>
                          <BookmarkCheckFill width={20} height={20} />
                        </PrimaryRowButton>
                        {user?.type === 'admin' && (
                          <PrimaryRowButton
                            variant=''
                            className='ms-3'
                            onClick={() =>
                              dispatch(
                                openModal({
                                  content: (
                                    <LocalizationDeleteModal
                                      translation={translation}
                                    />
                                  )
                                })
                              )
                            }>
                            <XDiamondFill width={20} height={20} />
                          </PrimaryRowButton>
                        )}
                      </LocalizationEditorButtonsHolder>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </>
      ) : (
        <LoaderHolder>
          <Loader />
        </LoaderHolder>
      )}
      <Container className='text-center'>
        <Pagination
          pageSize={pageSize}
          itemsCount={itemsCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Container>
    </div>
  );
}

export default LocalizationKeyValueBody;
