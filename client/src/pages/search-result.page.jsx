import axios from "axios";
import { api } from "../config";
import React, { useState, useEffect } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";
import { successToast, errorToast, LocalizationTableBody } from "../components";

const SearchresultPage = () => {
  const { localizationKeyValues, localizationLocales } = api;

  const [locales, setLocales] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [keyValuesPair, setKeyValuesPair] = useState([]);
  const [defualtInputValue, setDefualtInputValue] = useState({});
  const [localeValueInputPair, setLocaleValueInputPair] = useState([]);

  useEffect(() => {
    getLocales();
    getkeyValues();
  }, []);

  const getLocales = async () => {
    try {
      const respond = await axios.get(localizationLocales);
      let obj = {};
      respond.data.length &&
        respond.data.map((el) => {
          obj[el.locale] = "";
          return el;
        });
      setDefualtInputValue(obj);
      setLocales(respond.data);
    } catch (error) {
      errorToast(error.message);
    }
  };

  const getkeyValues = async () => {
    try {
      const respond = await axios.get(localizationKeyValues);
      setKeyValuesPair(respond.data);
    } catch (error) {
      errorToast(error.message);
    }
  };

  const handleValueChange = (e, language) => {
    let copy = [...localeValueInputPair];
    const name = e.target.value;
    setDefualtInputValue({ ...defualtInputValue, [e.target.name]: name });
    if (!copy.some((el) => el.language === language)) {
      copy = [...copy, { name, language }];
      setLocaleValueInputPair(copy);
      return;
    }
    if (copy.some((el) => el.name !== name)) {
      copy.map((el) => {
        if (el.language === language) el.name = name;
        return el;
      });
      return;
    }
  };

  const onValueAddSubmit = async () => {
    try {
      const respond = await axios.post(localizationKeyValues, {
        key: localeValueInputPair
          .map((el) => el.name)
          .join(".")
          .replace(/ /g, "")
          .toLowerCase(),
        locale_values: localeValueInputPair,
      });
      setKeyValuesPair([...keyValuesPair, respond.data]);
      setLocaleValueInputPair([]);
      let obj = {};
      locales.length &&
        locales.map((el) => {
          obj[el.locale] = "";
          return el;
        });
      setDefualtInputValue(obj);
      successToast("localization added");
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <Row className="m-0 p-0">
      <Col
        lg={2}
        md={6}
        sm={12}
        style={{
          height: "100vh",
          backgroundColor: "#FAFAFA",
          boxShadow: `rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset`,
        }}
      >
        <Container className="py-5">
          <Form>
            {locales.length &&
              locales.map(({ _id, name, locale }) => (
                <Form.Group className="mb-3" key={_id}>
                  <Col lg={12} md={12} sm={12}>
                    <h5>Add a translation</h5>
                    <Form.Label>{name}</Form.Label>
                    <Form.Control
                      type="text"
                      name={locale}
                      value={defualtInputValue[locale]}
                      placeholder={`enter ${locale} value`}
                      onChange={(e) => handleValueChange(e, _id)}
                    />
                  </Col>
                </Form.Group>
              ))}
            {locales.length && (
              <Button
                variant=""
                style={{ backgroundColor: "#9967CE", color: "#FBFAF5" }}
                onClick={onValueAddSubmit}
              >
                Submit
              </Button>
            )}
          </Form>
        </Container>
      </Col>
      <Col lg={10} md={6} sm={12} className="py-4" style={{ height: "100vh" }}>
        <p style={{ fontSize: "3rem", color: "#9967CE" }}>
          {keyValuesPair.length} localizations found
        </p>
        <InputGroup className="mb-3">
          <Form.Control
            value={searchInput}
            placeholder="search translations"
            aria-label="search translations"
            aria-describedby="basic-addon2"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button
            id="basic-addon2"
            variant=""
            style={{ backgroundColor: "#9967CE", color: "#FBFAF5" }}
          >
            search
          </Button>
        </InputGroup>
        {keyValuesPair.length > 0 ? (
          <Table size="lg">
            {/* <Table striped bordered hover size="sm"> */}
            <thead>
              <tr>
                <th>#</th>
                {locales.length &&
                  locales.map(({ _id, name, locale }) => (
                    <th key={_id}>
                      {locale} ({name})
                    </th>
                  ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {keyValuesPair.length &&
                keyValuesPair.map((key_values) => (
                  <LocalizationTableBody
                    locales={locales}
                    key={key_values._id}
                    key_values={key_values}
                  />
                ))}
            </tbody>
          </Table>
        ) : (
          <Spinner animation="grow" />
        )}
      </Col>
    </Row>
  );
};

export default SearchresultPage;
