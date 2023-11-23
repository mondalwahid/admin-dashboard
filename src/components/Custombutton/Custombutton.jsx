import React from "react";
import styles from "@/styles/Login.module.css";

const Custombutton = ({ handleFormSubmit, poppins, mode, handleSave }) => {
  return (
    <>
      <button
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
