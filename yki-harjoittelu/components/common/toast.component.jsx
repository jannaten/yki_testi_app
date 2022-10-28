import React from "react";
import toast from "react-hot-toast";
import { CheckCircleFill } from "react-bootstrap-icons";

export const successToast = (
  sucess,
  // theme,
  position = "bottom-right"
) => {
  return toast.success(sucess, {
    duration: 3000,
    // icon: <CheckCircleFill color={theme.primary} />,
    icon: <CheckCircleFill color="#9967CE" />,
    position,
    style: {
      width: "auto",
      display: "grid",
      transition: "1s",
      borderRadius: "0px",
      // color: `${theme.secondary}`,
      color: "#9967CE",
      transform: "translate(400px)",
      gridTemplateColumns: "1.2fr 6fr 0.5fr",
      // backgroundColor: `${theme.basic.light}`,
      backgroundColor: `#FBFAF5`,
      borderLeft: `0.3rem solid #9967CE`,
    },
  });
};

export const errorToast = (error, position = "bottom-right") => {
  toast.error(error, {
    duration: 3000,
    position,
    style: {
      display: "grid",
      transition: "1s",
      borderRadius: "0px",
      backgroundColor: "#ffffff",
      transform: "translate(400px)",
      borderLeft: "0.3rem solid #ff355b",
      gridTemplateColumns: "1.2fr 6fr 0.5fr",
    },
  });
};
