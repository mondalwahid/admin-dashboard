import React from "react";
import { Poppins } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Custombutton from "@/components/Custombutton/Custombutton";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });

const songReqAmount = [
  {
    id: 1,
    amount: 199,
  },
  {
    id: 2,
    amount: 149,
  },
  {
    id: 3,
    amount: 99,
  },
  {
    id: 4,
    amount: 49,
  },
];

const radioContent = [
  {
    id: 1,
    item: "yes",
  },
  {
    id: 2,
    item: "no",
  },
];

export default function Home() {
  const [selectedRadio, setSelectedradio] = useState("yes");
  const [amountval, setAmountval] = useState();
  const [sortedval, setSortedval] = useState();
  const [responsedata, setResponseData] = useState(null);
  const [responsedataerror, setResponsedataerror] = useState(null);
  const [isChargeEnabled, setIsChargeEnabled] = useState(true);

  function handleAmountValChange(e) {
    setAmountval(e.target.value);
    setSortedval(e.target.value);
  }

  function handleAmountChangeClick(id) {
    setSortedval(id);
  }

  function handleRadioChange(e) {
    setIsChargeEnabled(e.target.value === "yes");
  }

  async function handleGetUserDetails() {
    try {
      const response = await axios.get(
        "https://stg.dhunjam.in/account/admin/4"
      );
      const apiBooleanValue = response.data.charge_customers;
      setIsChargeEnabled(apiBooleanValue);
      setResponseData(response.data);
    } catch (error) {
      setResponsedataerror(error);
    }
  }

  async function handleSave(e) {
    e?.preventDefault();
    try {
      const response = await axios.put(
        "https://stg.dhunjam.in/account/admin/4",
        {
          amount: {
            category_6: amountval || sortedval,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetUserDetails();
  }, []);

  return (
    <>
      {responsedataerror ? (
        "Something went wrong"
      ) : responsedata ? (
        <div className={styles.MainContainer}>
          <div className={styles.SubContainer}>
            <p className={`${styles.header} ${poppins.className}`}>
              {responsedata?.data?.name}, {responsedata?.data?.location}
            </p>

            <div style={{ width: 600 }}>
              <div className={`${styles.SectionContainer}`}>
                {/* First section */}
                <p
                  style={{
                    width: 300,
                  }}
                  className={`${poppins.className} ${styles.ParaStyles}`}
                >
                  do you want to charge your customers for requesting songs?
                </p>
                <div className={`${styles.InputContainer}`}>
                  {radioContent.map((e) => {
                    return (
                      <React.Fragment key={e.id}>
                        <input
                          type="radio"
                          id={e.item}
                          name="chargeOption"
                          value={e.item}
                          checked={isChargeEnabled === (e.item === "yes")}
                          onChange={handleRadioChange}
                        />
                        <p
                          className={`${poppins.className} ${styles.RadioLabels}`}
                          style={{ marginLeft: 10 }}
                        >
                          {e.item}
                        </p>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
              {/* Second Section */}
              <div className={`${styles.SectionContainer}`}>
                <p className={`${poppins.className} ${styles.ParaStyles}`}>
                  custom song request amount -
                </p>
                <input
                  disabled={isChargeEnabled === false ? true : false}
                  value={amountval || sortedval}
                  onChange={handleAmountValChange}
                  type="text"
                  placeholder="Enter an Amount"
                  className={`${poppins.className} ${styles.ParaStyles} ${styles.InputStyles}`}
                  style={{
                    border: isChargeEnabled === false && "1px solid lightgray",
                    cursor: isChargeEnabled === false && "not-allowed",
                  }}
                />
              </div>
              {/* Third Section */}
              <div className={`${styles.SectionContainer}`}>
                <p
                  style={{
                    width: 280,
                  }}
                  className={`${poppins.className} ${styles.ParaStyles}`}
                >
                  Regular song request amounts, from high to low -
                </p>
                <div className={`${styles.AmountContainer}`}>
                  {songReqAmount?.map((e) => {
                    return (
                      <div
                        key={e.id}
                        className={`${styles.PriceContainer}`}
                        style={{
                          border:
                            isChargeEnabled === false && "1px solid lightgray",
                          cursor: isChargeEnabled === false && "not-allowed",
                        }}
                        onClick={
                          isChargeEnabled !== false
                            ? () => handleAmountChangeClick(e.amount)
                            : null
                        }
                      >
                        {e.amount}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <Custombutton
              isChargeEnabled={isChargeEnabled}
              mode="savedetailsmode"
              handleSave={handleSave}
              poppins={poppins}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
