import React, { useEffect } from "react";
import { XDiamond } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationDeleteModal } from "../components";
import { LocalizationEditModal, Sidebar, Loader } from "../components";
import { Table, Form, Button, Col, Row, InputGroup } from "react-bootstrap";
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
      <Col
        lg={2}
        md={3}
        sm={12}
        style={{
          zIndex: 99,
          position: "fixed",
          minHeight: "100vh",
          marginTop: "3.8rem",
          backgroundColor: "#FAFAFA",
          boxShadow: `rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset`,
        }}
      >
        <Sidebar />
      </Col>
      <Col
        lg={10}
        md={9}
        sm={12}
        className="px-5"
        style={{
          height: "100vh",
          marginLeft: "auto",
          marginTop: "3.8rem",
        }}
      >
        <div style={{ marginTop: "3.8rem" }}>
          <p style={{ fontSize: "3rem", color: "#9967CE" }}>
            {translations.length}{" "}
            {translations.length > 1 ? "translations" : "translation"} found
          </p>
          <InputGroup className="mb-3">
            <Form.Control
              aria-describedby="basic-addon2"
              aria-label="search translations"
              placeholder="search translations"
            />
            <Button
              variant=""
              id="basic-addon2"
              style={{ backgroundColor: "#9967CE", color: "#FBFAF5" }}
            >
              search
            </Button>
          </InputGroup>
          {translations.length > 0 ? (
            <Table size="lg">
              {/* <Table striped bordered hover size="sm"> */}
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
                      <td
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          variant=""
                          style={{
                            color: "#FBFAF5",
                            backgroundColor: "#9967CE",
                          }}
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
                        </Button>
                        <Button
                          style={{ marginLeft: "1rem" }}
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
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          ) : (
            <div
              style={{
                display: "flex",
                marginTop: "15rem",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loader />
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default SearchresultPage;
