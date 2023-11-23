import React from "react";
import styles from "@/styles/Login.module.css";

const Custombutton = ({
  handleFormSubmit,
  poppins,
  mode,
  handleSave,
  isChargeEnabled,
}) => {
  return (
    <>
      <button
        disabled={isChargeEnabled === false ? true : false}
        style={{
          background: isChargeEnabled === false && "lightgray",
          color: isChargeEnabled === false && "black",
          border: isChargeEnabled === false && "1px solid gray",
          cursor: isChargeEnabled === false && "not-allowed",
        }}
        type="submit"
        onClick={
          mode === "formsubmitmode"
            ? handleFormSubmit
            : mode === "savedetailsmode"
            ? handleSave
            : null
        }
        className={`${styles.Btn} ${poppins.className}`}
      >
        {mode === "formsubmitmode" ? "Sign In" : "Save"}
      </button>
    </>
  );
};

export default Custombutton;
