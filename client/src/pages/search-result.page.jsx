import React, { useEffect } from "react";
import { useTheme } from "styled-components";
import { XDiamond } from "react-bootstrap-icons";
import { LocalizationTitleCount } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationDeleteModal } from "../components";
import { Table, Form, Button, Row, InputGroup } from "react-bootstrap";
import { LocalizationEditModal, Sidebar, Loader } from "../components";
import { LoaderHolder, LocalizationEditorButtonsHolder } from "../styles";
import { SideBarHolder, LocalizationHolder, PrimaryButton } from "../styles";
import { loadTranslations, loadLanguages, openModal } from "../redux/slices";

const SearchresultPage = () => {
  const dispatch = useDispatch();
  const { width } = useTheme();
  const { translations, languages } = useSelector(
    ({ localization }) => localization
  );

  useEffect(() => {
    dispatch(loadLanguages());
    dispatch(loadTranslations());
  }, []);

  return (
    <Row className={width >= 922 && "pt-5 m-0 pb-0 pe-0 ps-0"}>
      <SideBarHolder xm={12} sm={12} md={12} lg={3} xl={2}>
        <Sidebar />
      </SideBarHolder>
      <LocalizationHolder xm={12} sm={12} md={12} lg={9} xl={10}>
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
                {translations.length > 0 &&
                  translations.map((translation) => (
                    <tr
                      key={translation._id}
                      style={width < 992 ? { width: "100vw" } : {}}
                      className={
                        width < 992 ? "d-flex flex-column text-center" : ""
                      }
                    >
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
