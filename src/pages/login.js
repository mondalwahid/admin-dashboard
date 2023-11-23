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

  function handleShowPassword() {
    setShowpassword(!showpassword);
  }

  return (
    <>
      <div className={`${styles.LoginContainer} ${poppins.className}`}>
        <div className={styles.SubLoginContainer}>
          <p className={styles.LoginHeader}>venue admin login</p>
          <div className={`${styles.InputFieldsContainer}`}>
            <input
              className={`${styles.InputFields} ${poppins.className}`}
              style={{
                width: "100%",
                backgroundColor: "#030303",
                border: "none",
              }}
              placeholder="Username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 50,
              }}
            >
              {emailerror ? (
                <p
                  style={{ color: "red", fontSize: "13px" }}
                  className={`${poppins.className}`}
                >
                  {emailerror[0]}
                </p>
              ) : null}
            </div>
          </div>

          <div
            className={`${styles.InputFieldsContainer} ${styles.PassInputField}`}
          >
            <input
              style={{
                width: "100%",
                backgroundColor: "#030303",
                border: "none",
              }}
              className={`${styles.InputFields} ${poppins.className}`}
              placeholder="password"
              type={showpassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
            />
            <div onClick={handleShowPassword} className={styles.IconContainer}>
              {showpassword ? (
                <FaEyeSlash style={{ color: "#fff", fontSize: 20 }} />
              ) : (
                <FaEye style={{ color: "#fff", fontSize: 20 }} />
              )}
            </div>

            <div
              style={{
                position: "absolute",
                left: 0,
                top: 54,
              }}
            >
              {passworderror ? (
                <p
                  style={{ color: "red", fontSize: "13px" }}
                  className={`${poppins.className}`}
                >
                  {passworderror[0]}
                </p>
              ) : null}
              {error ? (
                <p style={{ color: "red", fontSize: "13px" }}>{error}</p>
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
