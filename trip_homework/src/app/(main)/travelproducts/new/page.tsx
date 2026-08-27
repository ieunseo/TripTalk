"use client";

import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import styles from "./styles.module.css";
/* 숙박권 판매 페이지 */
export default function TravelNewPage() {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const createEditor = async () => {
            const Quill = (await import("quill")).default;

            if (!editorRef.current) return;

            new Quill(editorRef.current, {
                theme: "snow",
                placeholder: "내용을 입력해주세요.",
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline"],
                        [{ header: [1, 2, 3, false] }],
                        [{ align: [] }],
                        ["link"]
                    ]
                }
            });
        };

        createEditor();
    }, []);

    return (
        <main className={styles.page}>
            <h1>숙박권 판매하기</h1>
            <div className={styles.field}>
                <p>상품명<span>*</span></p>
                <input type="text" placeholder="상품명을 입력해주세요." required />
            </div>

            <hr />

            <div className={styles.field}>
                <p>한줄요약<span>*</span></p>
                <textarea placeholder="상품을 한줄로 요약해주세요." required />
            </div>

            <div className={styles.productSummary}>
                <p>상품 설명<span>*</span></p>
                <div ref={editorRef} />
            </div>

            <hr />

            <div className={styles.field}>
                <p>판매 가격<span>*</span></p>
                <div className={styles.price}><input type="number" placeholder="판매 가격을 입력해주세요." required /><span>원</span></div>
            </div>

            <div className={styles.field}>
                <p>태그</p>
                <input type="text" placeholder="태그를 입력하고 Enter를 눌러주세요. (예: #오션뷰 #조식포함)" />
            </div>

            <hr />

            <section className={styles.location}>
                <p className={styles.label}>주소<span>*</span></p>
                <div className={styles.zip}><input type="text" placeholder="우편번호" readOnly /><button type="button">우편번호 검색</button></div>
                <input type="text" placeholder="주소를 검색해주세요." readOnly />
                <input type="text" placeholder="상세 주소를 입력해주세요." />
            </section>

            <div className={styles.coord}>
                <div className={styles.field}><p>위도 (LAT)</p><input type="text" placeholder="위도를 입력해주세요." /></div>
                <div className={styles.field}><p>경도 (LNG)</p><input type="text" placeholder="경도를 입력해주세요." /></div>
            </div>

            <div className={styles.field}>
                <p>상세 위치</p>
                <div className={styles.map}>지도를 표시할 영역입니다.</div>
            </div>

            <div className={styles.field}>
                <p>사진 첨부</p>
                <label className={styles.upload}><input type="file" accept="image/*" multiple /><strong>＋</strong><span>사진 추가</span></label>
                <small>이미지는 최대 5장까지 등록할 수 있습니다.</small>
            </div>

            <div className={styles.actions}><button type="button" className={styles.cancel}>취소</button><button type="submit" className={styles.submit}>등록하기</button></div>
        </main>
    );
}
