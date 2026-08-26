"use client";

import { useState } from "react";

import MyPoint from "@/components/mypage/my-point";
import MyProduct from "@/components/mypage/my-product";
import styles from "./styles.module.css";

export default function MyPage() {
  const [menu, setMenu] = useState("point");
  const user = {
      name: "은서띠띠",
      point:123123,
      image:"",
  };

  return (
    <main className={styles.page}>
      <h1>마이 페이지</h1>

      <section className={styles.info}>
        <strong>내 정보</strong>

        <div className={styles.user}>
          <div className={styles.image}>{user.image}</div>
          <span>{user.name}</span>
        </div>

        <div className={styles.line} />

          <div className={styles.pointSection}>  <img src="/icons/point.svg"/><p className={styles.point}>{user.point}</p></div>

        <div className={styles.line} />

          <button
              className={menu === "product" ? styles.selected : ""}
              onClick={() => setMenu("product")}
          >
              거래내역 & 북마크　&gt;
          </button>

          <button
              className={menu === "point" ? styles.selected : ""}
              onClick={() => setMenu("point")}
          >
              포인트 사용 내역　&gt;
          </button>
        <button>비밀번호 변경　&gt;</button>
      </section>

      <div className={styles.menu}>
        <button
          className={menu === "point" ? styles.active : ""}
          onClick={() => setMenu("point")}
        >
          포인트 사용 내역
        </button>
        <button
          className={menu === "product" ? styles.active : ""}
          onClick={() => setMenu("product")}
        >
          나의 상품 & 북마크
        </button>
      </div>

      {menu === "point" ? <MyPoint /> : <MyProduct />}
    </main>
  );
}
