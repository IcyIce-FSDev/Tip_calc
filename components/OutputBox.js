"use client";

import { useEffect, useState } from "react";
import styles from "./OutputBox.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  updateBillAmount,
  updateTipAmount,
  updateNumOfPeople,
  updateUseCustomTip,
} from "../lib/redux/calculatorSlice";

export default function OutputBox() {
  const dispatch = useDispatch();
  const { billAmount, tipAmount, numOfPeople, useCustomTip } = useSelector(
    (state) => state.calculator
  ); // Access the state from your calculatorSlice

  // Tip amount per person
  const [personTip, setPersonTip] = useState("0.00");
  // Total amount per person
  const [personTotal, setPersonTotal] = useState("0.00");

  // Function to handle reseting form
  const handleReset = () => {
    dispatch(updateBillAmount(Number(0)));
    dispatch(updateTipAmount(Number(0)));
    dispatch(updateNumOfPeople(Number(1)));
    dispatch(updateUseCustomTip(Boolean(false)));

    setPersonTip("0.00");
    setPersonTotal("0.00");
    const listOfRadios = document.getElementsByName("tipOptions");

    for (let radio of listOfRadios) {
      radio.checked = false;
    }
  };

  // Function to handle computing outputs
  useEffect(() => {
    if (!billAmount || !tipAmount || !numOfPeople) {
      return;
    }

    const percentTip = tipAmount / 100;
    const totalTip = billAmount * percentTip;
    const tipPerPerson = totalTip / numOfPeople;
    const totalPerPerson = (billAmount + totalTip) / numOfPeople;

    const roundedValues = {
      tip: Math.floor(tipPerPerson * 100) / 100,
      total: Math.ceil(totalPerPerson * 100) / 100,
    };

    setPersonTip(roundedValues.tip.toFixed(2));
    setPersonTotal(roundedValues.total.toFixed(2));
    return;
  }, [billAmount, tipAmount, numOfPeople, useCustomTip]);

  return (
    <div className={styles.outputbox}>
      <div className={styles.outputamounts}>
        <span className={styles.left}>
          <p>Tip Amount</p> <p className={styles.lightgrey}>/ person</p>
        </span>
        <p className={styles.right}>${personTip}</p>
        <span className={styles.left}>
          <p>Total</p> <p className={styles.lightgrey}>/ person</p>
        </span>
        <p className={styles.right}>${personTotal}</p>
      </div>

      <button className={styles.resetbutton} onClick={handleReset}>
        RESET
      </button>
    </div>
  );
}
