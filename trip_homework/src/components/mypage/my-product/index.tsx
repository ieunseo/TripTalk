"use client";

import { useState } from "react";

import styles from "./styles.module.css";

const products = [
  {
    number: 122,
    name: "파르나스 호텔 제주",
    price: "326,000",
    date: "2024.12.16",
  },
  {
    number: 123,
    name: "띠띠빵빵",
    price: "1,233,123",
    date: "2024.12.16",
  },
];

export default function MyProduct() {
  const [tab, setTab] = useState("나의 상품");
  const [word, setWord] = useState("");
  const formatDate = (date: string) => {
    return date.slice(0, 10).replaceAll("-", ".");
  };

  const list = products.filter((product) => product.name.includes(word));

  return (
    <section>
      <div className={styles.top}>
        <div className={styles.tabs}>
          {["나의 상품", "북마크"].map((item) => (
            <button
              className={tab === item ? styles.active : ""}
              key={item}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <input
          className={styles.search}
          value={word}
          onChange={(event) => setWord(event.target.value)}
          placeholder="⌕ 필요한 내용을 검색해 주세요."
        />
      </div>

      <div className={styles.box}>
        <div className={styles.head}>
          <span>번호</span>
          <span>상품 명</span>
          <span>판매가격</span>
          <span>날짜</span>
        </div>

        {list.map((product) => (
          <div className={styles.row} key={product.number}>
            <span>{product.number}</span>
            <strong>{product.name}</strong>
            <span>{product.price}원</span>
            <span>{formatDate(product.date)}</span> {/*혹시몰라 한번 더 변환*/}
          </div>
        ))}
      </div>
    </section>
  );
}
