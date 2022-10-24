import { paginate } from "../utils";
import { useTheme } from "styled-components";
import { InputGroup } from "react-bootstrap";
import { XDiamond } from "react-bootstrap-icons";
import { LocalizationTitleCount } from "../styles";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationDeleteModal, Pagination } from "../components";
import { Table, Form, Button, Row, Container } from "react-bootstrap";
import { LocalizationEditModal, Sidebar, Loader } from "../components";
import { LoaderHolder, LocalizationEditorButtonsHolder } from "../styles";
import { SideBarHolder, LocalizationHolder, PrimaryButton } from "../styles";
import { loadTranslations, loadLanguages, openModal } from "../redux/slices";

const SearchresultPage = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [sliderView, setSliderView] = useState(false);
  const [pageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { width } = useTheme();
  const { translations, languages } = useSelector(
    ({ localization }) => localization
  );

  useEffect(() => {
    dispatch(loadLanguages());
    dispatch(loadTranslations());
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const isTransltionDefined = Array.isArray(translations);
  let filteredTranslations;
  if (isTransltionDefined) {
    filteredTranslations = translations.filter((filtering) => {
      if (
        filtering?.key?.toLowerCase().includes(searchInputValue.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }

  const paginatedTranslations = paginate(
    filteredTranslations,
    currentPage,
    pageSize
  );

  return (
    <Row className={width >= 992 ? "pt-5 m-0 pb-0 pe-0 ps-0" : "m-0 p-0"}>
      <SideBarHolder xm={12} sm={12} md={12} lg={3} xl={2}>
        <Sidebar />
      </SideBarHolder>
      <LocalizationHolder xm={12} sm={12} md={12} lg={9} xl={10}>
        <div>
          <LocalizationTitleCount>
            {filteredTranslations.length}{" "}
            {filteredTranslations.length > 1 ? "translations" : "translation"}{" "}
            found
          </LocalizationTitleCount>
          <InputGroup className="mb-3">
            <Form.Control
              aria-describedby="basic-addon2"
              aria-label="search translations"
              placeholder="search translations"
              onChange={(e) => {
                setSearchInputValue(e.target.value);
              }}
            />
            <PrimaryButton variant="" id="basic-addon2">
              search
            </PrimaryButton>
          </InputGroup>
          <Container className="text-center">
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
            <Table size="lg" responsive={width < 992}>
              <thead>
                <tr
                  style={width < 992 ? { width: "100vw" } : {}}
                  className={
                    width < 992 ? "d-flex flex-column text-center" : ""
                  }
                >
                  {width >= 992 ? <th>keys</th> : <th></th>}
                  {languages.length &&
                    languages.map(({ _id, name, locale }) => (
                      <th key={_id}>
                        {locale} ({name})
                      </th>
                    ))}
                  {width >= 992 && <th className="ms-auto"></th>}
                </tr>
              </thead>
              <tbody>
                {paginatedTranslations.length > 0 &&
                  paginatedTranslations.map((translation) => (
                    <tr
                      key={translation._id}
                      style={width < 992 ? { width: "100vw" } : {}}
                      className={
                        width < 992 ? "d-flex flex-column text-center" : ""
                      }
                    >
                      <td>{translation.key}</td>
                      {/* {
                        <Slider
                          value={
                            translation.locale_values[
                              translation.locale_values?.length - 1
                            ]?.name
                          }
                        >
                          Slide.
                        </Slider>
                      } */}
                      {!sliderView &&
                        languages?.length &&
                        languages.map((locales) => (
                          <td key={locales._id}>
                            <>
                              {translation.locale_values.length &&
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
                        <PrimaryButton
                          variant=""
                          onClick={() =>
                            dispatch(
                              openModal({
                                content: (
                                  <LocalizationEditModal
                                    translation={translation}
                                  />
                                ),
                              })
                            )
                          }
                        >
                          Edit
                        </PrimaryButton>
                        <Button
                          className="ms-3"
                          variant="outline-dark"
                          onClick={() =>
                            dispatch(
                              openModal({
                                content: (
                                  <LocalizationDeleteModal
                                    translation={translation}
                                  />
                                ),
                              })
                            )
                          }
                        >
                          <XDiamond width={20} height={20} />
                        </Button>
                      </LocalizationEditorButtonsHolder>
                    </tr>
                  ))}
              </tbody>
            </Table>
          ) : (
            <LoaderHolder>
              <Loader />
            </LoaderHolder>
          )}
        </div>
      </LocalizationHolder>
    </Row>
  );
};

export default SearchresultPage;
