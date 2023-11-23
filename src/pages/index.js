import React from "react";
import { Poppins } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Custombutton from "@/components/Custombutton/Custombutton";
// import Bargraph from "../components/Bargraph/Bargraph";

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

  function handleAmountValChange(e) {
    setAmountval(e.target.value);
    setSortedval(e.target.value);
  }

  function handleAmountChangeClick(id) {
    setSortedval(id);
  }

  function handleRadioChange(e) {
    const selectedValue = e.target.value;
    setSelectedradio(selectedValue);
  }

  async function handleGetUserDetails() {
    try {
      const response = await axios.get(
        "https://stg.dhunjam.in/account/admin/4"
      );
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
                        checked={selectedRadio === e.item}
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
                value={amountval || sortedval}
                onChange={handleAmountValChange}
                type="text"
                placeholder="Enter an Amount"
                className={`${poppins.className} ${styles.ParaStyles} ${styles.InputStyles}`}
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
                      onClick={() => handleAmountChangeClick(e.amount)}
                    >
                      {e.amount}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <Bargraph /> */}
          <Custombutton
            mode="savedetailsmode"
            handleSave={handleSave}
            poppins={poppins}
          />
        </div>
      </div>
    </>
  );
}
