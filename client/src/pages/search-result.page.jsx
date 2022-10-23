import React, { useEffect } from "react";
import { XDiamond } from "react-bootstrap-icons";
import { LocalizationTitleCount } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationDeleteModal } from "../components";
import { Table, Form, Button, Row, InputGroup, Col } from "react-bootstrap";
import { LocalizationEditModal, Sidebar, Loader } from "../components";
import { LoaderHolder, LocalizationEditorButtonsHolder } from "../styles";
import { SideBarHolder, LocalizationHolder, PrimaryButton } from "../styles";
import { loadTranslations, loadLanguages, openModal } from "../redux/slices";

const SearchresultPage = () => {
  const dispatch = useDispatch();
  const { translations, languages } = useSelector(
    ({ localization }) => localization
  );

  useEffect(() => {
    dispatch(loadLanguages());
    dispatch(loadTranslations());
  }, []);

  return (
    <Row className="m-0 p-0">
      <SideBarHolder xm={12} sm={12} md={12} lg={2} xl={2}>
        <Sidebar />
      </SideBarHolder>
      <LocalizationHolder xl={10} lg={10} md={12} xm={12} sm={12}>
        <div>
          <LocalizationTitleCount>
            {translations.length}{" "}
            {translations.length > 1 ? "translations" : "translation"} found
          </LocalizationTitleCount>
          <InputGroup className="mb-3">
            <Form.Control
              aria-describedby="basic-addon2"
              aria-label="search translations"
              placeholder="search translations"
            />
            <PrimaryButton variant="" id="basic-addon2">
              search
            </PrimaryButton>
          </InputGroup>
          {translations.length > 0 ? (
            <Table size="lg">
              <thead>
                <tr>
                  <th>#</th>
                  {languages.length &&
                    languages.map(({ _id, name, locale }) => (
                      <th key={_id}>
                        {locale} ({name})
                      </th>
                    ))}
                  <th className="ms-auto"></th>
                </tr>
              </thead>
              <tbody>
                {translations.length > 0 &&
                  translations.map((translation) => (
                    <tr key={translation._id}>
                      <td>{translation.key}</td>
                      {languages?.length &&
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
