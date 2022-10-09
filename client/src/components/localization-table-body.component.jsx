import React from "react";
import { Button } from "react-bootstrap";

function LocalizationTableBody({ key_values, locales }) {
  const { key, locale_values } = key_values;
  return (
    <tr>
      <td>{key}</td>
      {locales.length &&
        locales.map((locales) => (
          <td key={locales._id}>
            <>
              {locale_values.length &&
                locale_values.map(({ language, name }, index) => (
                  <span key={index}>
                    {locales.locale === language.locale && name}
                  </span>
                ))}
            </>
          </td>
        ))}
      <td>
        <Button
          variant=""
          style={{
            backgroundColor: "#9967CE",
            color: "#FBFAF5",
          }}
        >
          Edit
        </Button>
      </td>
    </tr>
  );
}

export default LocalizationTableBody;
