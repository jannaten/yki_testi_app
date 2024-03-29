//importing libraries
import { useTheme } from 'styled-components';
import { Table, Form, Row } from 'react-bootstrap';
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { XDiamondFill, BookHalf } from 'react-bootstrap-icons';
import { Container, InputGroup, Col, Card } from 'react-bootstrap';
import { BookmarkCheckFill, PencilFill } from 'react-bootstrap-icons';
//importing utiles, components, redux and styles
import { paginate } from '../utils';
import { useScrollToTop } from '../hooks';
import Loader from './common/loader.component';
import { LocalizationTitleCount } from '../styles';
import { errorToast } from './common/toast.component';
import Pagination from './common/pagination.component';
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
  const { translations, languages, userWords } = useSelector(
    ({ localization }) => localization
  );

  const isPrevilegedUser = user?.type === 'admin' || user?.type === 'teacher';

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [currentPage]
  );

  const onPreviousPage = useCallback(() => {
    setCurrentPage(currentPage - 1);
  }, [currentPage]);

  const onNextPage = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [currentPage]);

  const isTransltionDefined = Array.isArray(translations);
  let filteredTranslations;
  if (isTransltionDefined) {
    filteredTranslations = translations.filter((filtering) => {
      if (
        filtering?.key?.toLowerCase().includes(searchInputValue.toLowerCase())
      )
        return true;
      for (let i = 0; i < filtering.locale_values.length; i++)
        if (
          filtering.locale_values[i].name
            ?.toLowerCase()
            .includes(searchInputValue?.toLowerCase())
        )
          return true;
      return false;
    });
  }

  const paginatedTranslations = useCallback(
    paginate(filteredTranslations, currentPage, pageSize),
    [filteredTranslations, currentPage, pageSize]
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
	useScrollToTop(currentPage);
  return (
    <div>
      <LocalizationTitleCount>
        {filteredTranslations.length}{' '}
        {filteredTranslations.length > 1 ? 'translations' : 'translation'} found
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
          onNextPage={onNextPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onPreviousPage={onPreviousPage}
          itemsCount={filteredTranslations.length}
        />
      </Container>
      {translations.length > 0 ? (
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
              {paginatedTranslations.length > 0 &&
                paginatedTranslations.map((translation) => (
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
                                      {locales.locale === language.locale &&
                                        name}
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
                {paginatedTranslations.length > 0 &&
                  paginatedTranslations.map((translation) => (
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
          onNextPage={onNextPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onPreviousPage={onPreviousPage}
          itemsCount={filteredTranslations.length}
        />
      </Container>
    </div>
  );
}

export default LocalizationKeyValueBody;
