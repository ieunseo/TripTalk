"use client";

import { useState } from "react";

import styles from "./styles.module.css";

const rows = [
  { type: "충전", money: "+1,000,000"},
  { type: "구매", money: "-50,000"},
  { type: "판매", money: "+1,000,000" },
  { type: "충전", money: "+1,000,000"},
  { type: "구매", money: "-50,000" },
];

export default function MyPoint() {
  const [tab, setTab] = useState("전체");

  const list =
    tab === "전체" ? rows : rows.filter((row) =>
        row.type === tab.replace("내역", ""));


  return (
    <section>
      <div className={styles.tabs}>
        {["전체", "충전내역", "구매내역", "판매내역"].map((item) => (

          <button
            className={tab === item ? styles.active : ""}
            key={item}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className={styles.box}>
        <div className={styles.head}>
          <span>날짜</span>
          <span>내용</span>
          <span>거래 및 충전 내역</span>
          <span>잔액</span>
        </div>

          {list.map((row, index) => {
              const color = row.type === "구매" ? styles.red : styles.blue;

              return (
                  <div className={styles.row} key={index}>
                      <span>2024.12.16</span>
                      <strong className={color}>{row.type}</strong>
                      <strong className={color}>{row.money}</strong>
                      <strong>1,222,000</strong>
                  </div>
              );
          })}
      </div>
    </section>
  );
}
