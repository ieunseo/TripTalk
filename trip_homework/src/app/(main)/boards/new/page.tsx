"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.css";

export default function BoardNewPage() {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  // 필수 항목을 다 채워야 등록하기 버튼이 파란색으로 활성화돼요.
  const isValid = Boolean(writer && password && title && content);

  return (
    <main className={styles.page}>
      <h1>게시물 등록</h1>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="writer">작성자 *</label>
          <input
            id="writer"
            value={writer}
            onChange={(event) => setWriter(event.target.value)}
            placeholder="작성자 명을 입력해 주세요."
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password">비밀번호 *</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호를 입력해 주세요."
          />
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.field}>
        <label htmlFor="title">제목 *</label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="제목을 입력해 주세요."
        />
      </div>

      <hr className={styles.divider} />

      <div className={styles.field}>
        <label htmlFor="content">내용 *</label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="내용을 입력해 주세요."
        />
      </div>

      <hr className={styles.divider} />

      <div className={styles.field}>
        <label>주소</label>
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
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="주소를 입력해 주세요."
        />
        <input
          value={detailAddress}
          onChange={(event) => setDetailAddress(event.target.value)}
          placeholder="상세주소"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="youtube">유튜브 링크</label>
        <input
          id="youtube"
          value={youtubeUrl}
          onChange={(event) => setYoutubeUrl(event.target.value)}
          placeholder="링크를 입력해 주세요."
        />
      </div>

      <div className={styles.field}>
        <label>사진 첨부</label>
        <div className={styles.photoRow}>
          {[1, 2, 3].map((box) => (
            <button className={styles.photoBox} type="button" key={box}>
              <span className={styles.plus}>+</span>
              <span>클릭해서 사진 업로드</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.buttonRow}>
        <Link className={styles.cancelButton} href="/">
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
