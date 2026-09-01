"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import styles from "./styles.module.css";

// Quill은 브라우저에서만 돌려야 해서 ssr을 꺼놓고 불러와요.
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function TravelProductNewPage() {
  const [productName, setProductName] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  // 필수 항목을 다 채워야 등록하기 버튼이 파란색으로 활성화돼요.
  const isValid = Boolean(
    productName && summary && description && price && detailAddress,
  );

  return (
    <main className={styles.page}>
      <h1>숙박권 판매하기</h1>

      <div className={styles.field}>
        <label htmlFor="productName">상품명 *</label>
        <input
          id="productName"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
          placeholder="상품명을 입력해 주세요."
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="summary">한줄 요약 *</label>
        <input
          id="summary"
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          placeholder="상품을 한줄로 요약해 주세요."
        />
      </div>

      <div className={styles.field}>
        <label>상품 설명 *</label>
        <ReactQuill
          className={styles.editor}
          theme="snow"
          value={description}
          onChange={setDescription}
          placeholder="내용을 입력해 주세요."
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="price">판매 가격 *</label>
        <input
          id="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="판매 가격을 입력해 주세요. (숫자만)"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="tags">태그 입력</label>
        <input
          id="tags"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          placeholder="태그를 입력해 주세요."
        />
      </div>

      <div className={styles.locationRow}>
        <div className={styles.locationLeft}>
          <div className={styles.field}>
            <label>주소 *</label>
            <div className={styles.zipRow}>
              <input
                className={styles.zipInput}
                value={zipCode}
                onChange={(event) => setZipCode(event.target.value)}
                placeholder="01234"
              />
              <button className={styles.zipButton} type="button">
                우편번호 검색
              </button>
            </div>
            <input
              value={detailAddress}
              onChange={(event) => setDetailAddress(event.target.value)}
              placeholder="상세주소를 입력해 주세요."
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="lat">위도(LAT)</label>
            <input
              id="lat"
              value={lat}
              onChange={(event) => setLat(event.target.value)}
              placeholder="주소를 먼저 입력해 주세요."
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="lng">경도(LNG)</label>
            <input
              id="lng"
              value={lng}
              onChange={(event) => setLng(event.target.value)}
              placeholder="주소를 먼저 입력해 주세요."
            />
          </div>
        </div>

        <div className={styles.locationRight}>
          <label>상세 위치</label>
          <div className={styles.mapBox}>
            {detailAddress ? (
              <>
                <Image
                  src="/icons/location.svg"
                  alt=""
                  width={28}
                  height={28}
                />
                <p>{detailAddress}</p>
              </>
            ) : (
              <p>주소를 먼저 입력해 주세요.</p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.field}>
        <label>사진 첨부</label>
        <button className={styles.photoBox} type="button">
          <span className={styles.plus}>+</span>
          <span>클릭해서 사진 업로드</span>
        </button>
      </div>

      <div className={styles.buttonRow}>
        <Link className={styles.cancelButton} href="/travelproducts">
          취소
        </Link>
        <button
          className={
            isValid
              ? `${styles.submitButton} ${styles.active}`
              : styles.submitButton
          }
          type="button"
          disabled={!isValid}
        >
          등록하기
        </button>
      </div>
    </main>
  );
}
