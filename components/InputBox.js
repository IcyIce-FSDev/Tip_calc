"use client";

import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBillAmount,
  updateTipAmount,
  updateNumOfPeople,
  updateUseCustomTip,
} from "../lib/redux/calculatorSlice";

import styles from "./InputBox.module.css";

const tipOptions = [12, 15, 20, 25, 30];

export default function InputBox() {
  const dispatch = useDispatch();
  const { billAmount, tipAmount, numOfPeople, useCustomTip } = useSelector(
    (state) => state.calculator
  ); // Access the state from your calculatorSlice

  // Functions to change state in store
  const handleBillAmountChange = (e) => {
    dispatch(updateBillAmount(Number(e.target.value)));
  };

  const handleNumOfPeopleChange = (e) => {
    dispatch(updateNumOfPeople(Number(e.target.value)));
  };

  // Function to handle the Tip amount
  const handleTipChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    if (parseFloat(id)) {
      dispatch(updateTipAmount(Number(value)));
      dispatch(updateUseCustomTip(Boolean(false)));

      const listOfRadios = document.getElementsByName("tipOptions");

      for (let radio of listOfRadios) {
        radio.checked = false;

        if (radio.id === id) {
          radio.checked = true;
        }
      }
    }

    if (id == "custom") {
      dispatch(updateTipAmount(Number(value)));
    }
  };

  return (
    <form className={styles.inputbox}>
      {/* Input for bill amount */}
      <div className={styles.billcontainer}>
        <label htmlFor="bill">Bill</label>
        <span className={styles.billrelative}>
          <Image
            src="/tipcalc/icon-dollar.svg"
            alt="Dollar Sign"
            width="10"
            height="16"
            className={styles.dollarsign}
          />
          <input
            type="number"
            id="bill"
            name="bill"
            min="0"
            step="0.01"
            value={billAmount}
            onChange={handleBillAmountChange}
            className={styles.billinput}
            onClick={() => {
              dispatch(updateBillAmount(String("")));
            }}
          />
        </span>
      </div>

      <br />

      {/* Input for tip amount */}
      <div>
        <p>Select Tip %</p>
        <div className={styles.tipgrid}>
          {tipOptions.map((tip) => {
            return (
              <div key={tip}>
                <input
                  type="radio"
                  name="tipOptions"
                  value={tip}
                  id={tip}
                  className={styles.tipbutton}
                  onClick={handleTipChange}
                />
                <label htmlFor={tip} className={styles.tiplabel}>
                  {tip}%
                </label>
              </div>
            );
          })}
          <div>
            <input
              type="number"
              key="custom"
              name="tipOptions"
              value={tipAmount}
              id="custom"
              className={
                useCustomTip ? styles.tipbutton : styles.tipbuttonhidden
              }
              onChange={handleTipChange}
            />
            <label
              htmlFor="custom"
              key="custom1"
              className={useCustomTip ? styles.hiddentiplabel : styles.tiplabel}
              onClick={() => {
                dispatch(updateTipAmount(""));
                dispatch(updateUseCustomTip(Boolean(true)));
                const listOfRadios = document.getElementsByName("tipOptions");

                for (let radio of listOfRadios) {
                  radio.checked = false;
                }
              }}
            >
              Custom
            </label>
          </div>
        </div>
      </div>

      <br />

      {/* Input for amount of people */}
      <div className={styles.peoplecontainer}>
        <label htmlFor="people">Number of People</label>
        <span className={styles.peoplerelative}>
          <Image
            src="/tipcalc/icon-person.svg"
            alt="Person Sign"
            width="12"
            height="16"
            className={styles.peoplesign}
          />
          <input
            type="number"
            id="people"
            name="people"
            step="1"
            min="1"
            value={numOfPeople}
            onChange={handleNumOfPeopleChange}
            className={styles.peopleinput}
            onClick={() => {
              dispatch(updateNumOfPeople(""));
            }}
          />
        </span>
      </div>
    </form>
  );
}
