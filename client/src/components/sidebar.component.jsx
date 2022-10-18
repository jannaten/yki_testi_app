import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { translationInputReset } from "../redux/slices";
import { Button, Container, Form, Col, Table } from "react-bootstrap";
import { addTranslation, handleTranslationValueChange } from "../redux/slices";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { translations, languages, localeValueInputPair, defaultInputValue } =
    useSelector(({ localization }) => localization);

  const isTransltionDefined = Array.isArray(translations);
  let filteredTranslations;
  if (isTransltionDefined) {
    filteredTranslations = translations.filter((filtering) => {
      if (
        filtering?.key?.toLowerCase().includes(
          localeValueInputPair
            .map((el) => el.name)
            .join(".")
            .replace(/ /g, "")
            ?.toLowerCase()
        )
      ) {
        return true;
      }
      languages.map((el) => {
        if (
          filtering?.locale_values[0].name
            .toLowerCase()
            .includes(defaultInputValue[el.locale]?.toLowerCase())
        ) {
          return true;
        }
      });
      return false;
    });
  }

  const mountedStyle = { animation: "inAnimation 250ms ease-in" };
  const unmountedStyle = {
    animation: "outAnimation 270ms ease-out",
    animationFillMode: "forwards",
  };

  return (
    <Container style={{ marginTop: "5rem" }}>
      <Form>
        <p className="my-4 h5">Add a translation</p>
        {languages.length > 0 &&
          languages.map(({ _id, name, locale }) => (
            <Form.Group className="my-3" key={_id}>
              <Col lg={12} md={12} sm={12}>
                <Form.Label>{name}</Form.Label>
                <Form.Control
                  type="text"
                  name={locale}
                  value={
                    defaultInputValue[locale] ? defaultInputValue[locale] : ""
                  }
                  placeholder={`enter ${locale} value`}
                  onChange={(e) => {
                    dispatch(handleTranslationValueChange({ event: e, _id }));
                  }}
                />
              </Col>
            </Form.Group>
          ))}
        {languages.length > 0 && (
          <Button
            variant=""
            style={{ backgroundColor: "#9967CE", color: "#FBFAF5" }}
            onClick={() => {
              dispatch(
                addTranslation({
                  key: localeValueInputPair
                    .map((el) => el.name)
                    .join(".")
                    .replace(/ /g, "")
                    .toLowerCase(),
                  locale_values: localeValueInputPair.map((el) => {
                    let obj = { ...el };
                    obj.name = el.name
                      ?.replace(/^\s+|\s+$|\s+(?=\s)/g, "")
                      ?.split(" ")
                      ?.map((word, index) =>
                        index === 0
                          ? word[index]?.toUpperCase() + word?.substring(1)
                          : word
                      )
                      ?.join(" ");
                    return obj;
                  }),
                })
              );
              dispatch(translationInputReset());
            }}
          >
            Submit
          </Button>
        )}
      </Form>
      <div
        className="transitionDiv w-100"
        style={
          filteredTranslations.length !== translations.length &&
          filteredTranslations.length > 0
            ? mountedStyle
            : unmountedStyle
        }
      >
        <div
          style={{
            paddingTop: "2rem",
            opacity: "0.7",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "1.5rem", color: "#9967CE" }}>
            {filteredTranslations.length}{" "}
            {filteredTranslations.length > 1 ? "results" : "result"} found
          </p>
          <div style={{ overflowY: "scroll", maxHeight: "63vh" }}>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  {languages.length &&
                    languages.map(({ _id, locale }) => (
                      <th key={_id}>{locale}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {filteredTranslations.length > 0 &&
                  filteredTranslations.map((translation) => (
                    <tr key={translation._id}>
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
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Sidebar;
