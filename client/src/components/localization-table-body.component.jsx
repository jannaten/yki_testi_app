import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LocalizationEditValuesModal } from ".";
import { handleModelToggle } from "../redux/slices";

function LocalizationTableBody({ key_values, locales }) {
  const dispatch = useDispatch();
  const { key, locale_values } = key_values;
  const handleClick = () => {
    dispatch(handleModelToggle());
  };
  return (
    <tr>
      <td>{key}</td>
      {locales?.length &&
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
          onClick={handleClick}
        >
          Edit
        </Button>
      </td>
    </tr>
  );
}

export default LocalizationTableBody;
