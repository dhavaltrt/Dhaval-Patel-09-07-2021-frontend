import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { TheContent, TheFooter, TheHeader } from "./index";

const TheLayout = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const classes = classNames(
    "c-app c-default-layout",
    darkMode && "c-dark-theme"
  );

  return (
    <div className={classes}>
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
