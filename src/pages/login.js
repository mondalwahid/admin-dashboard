import React, { useState, useEffect } from "react";
import styles from "@/styles/Login.module.css";
import { Poppins } from "next/font/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Custombutton from "@/components/Custombutton/Custombutton";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });

const login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [emailerror, setEmailerror] = useState();
  const [passworderror, setPassworderror] = useState();
  const [error, setError] = useState(null);

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleShowPassword() {
    setShowpassword(!showpassword);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://stg.dhunjam.in/account/admin/login",
        {
          username: username,
          password: password,
        }
      );
      setResponseData(response.data);
      router.push("/");
    } catch (error) {
      setEmailerror(error.response.data.username);
      setPassworderror(error.response.data.password);
      setError(error.response.data.ui_err_msg);
    }
  }

  return (
    <>
      <div className={`${styles.LoginContainer} ${poppins.className}`}>
        <div className={styles.SubLoginContainer}>
          <p className={styles.LoginHeader}>venue admin login</p>
          <div className={`${styles.InputFieldsContainer}`}>
            <input
              className={`${styles.InputFields} ${poppins.className}`}
              placeholder="Username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
            <div className={`${styles.ErrorContainer}`}>
              {emailerror ? (
                <p className={`${poppins.className} ${styles.ErrorTextStyles}`}>
                  {emailerror[0]}
                </p>
              ) : null}
            </div>
          </div>

          <div
            className={`${styles.InputFieldsContainer} ${styles.PassInputField}`}
          >
            <input
              className={`${styles.InputFields} ${poppins.className}`}
              placeholder="password"
              type={showpassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
            />
            <div onClick={handleShowPassword} className={styles.IconContainer}>
              {showpassword ? (
                <FaEyeSlash className={`${styles.IconStyles}`} />
              ) : (
                <FaEye className={`${styles.IconStyles}`} />
              )}
            </div>

            <div className={`${styles.ErrorContainer}`}>
              {passworderror ? (
                <p className={`${poppins.className} ${styles.ErrorTextStyles}`}>
                  {passworderror[0]}
                </p>
              ) : null}
              {error ? (
                <p className={`${poppins.className} ${styles.ErrorTextStyles}`}>
                  {error}
                </p>
              ) : null}
            </div>
          </div>

          <Custombutton
            handleFormSubmit={handleFormSubmit}
            poppins={poppins}
            mode={"formsubmitmode"}
          />
          <p className={`${styles.RegistrationPara} ${poppins.className}`}>
            New Registration?
          </p>
        </div>
      </div>
    </>
  );
};

export default login;
