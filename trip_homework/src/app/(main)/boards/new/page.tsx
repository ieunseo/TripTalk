"use client";

import styles from "./styles.module.css";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";

/* 게시물 등록 */
export default function BoardNewPage() {
    const imageInput = useRef<HTMLInputElement>(null);

    const [showImgUrls, setShowImgUrls] = useState<string[]>(["", "", ""]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    // 파일 선택 후 이미지 미리보기
    const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const newImgUrls = [...showImgUrls];

            newImgUrls[selectedImageIndex] = imageUrl;
            setShowImgUrls(newImgUrls);
        }
    };

    // 업로드 박스 클릭 → 숨겨진 input 클릭
    const handleUploadButtonClick = (index: number) => {
        setSelectedImageIndex(index);

        if (imageInput.current) {
            imageInput.current.click();
        }
    };

    return (
        <main className={styles.page}>
            <h2>게시물등록</h2>

            <div>
                <span>작성자<em>*</em></span>
                <input type="text" placeholder="작성자 명을 입력해주세요" required />

                <span>비밀번호<em>*</em></span>
                <input type="password" placeholder="비밀번호를 입력해주세요" required />
            </div>

            <hr />

            <div>
                <span>제목<em>*</em></span>
                <input type="text" placeholder="제목을 입력해주세요." required />
            </div>

            <hr />

            <div>
                <span>내용<em>*</em></span>
                <textarea placeholder="내용을 입력해주세요." required />
            </div>

            <hr />

            <div>
                <span>주소</span>
                <input type="text" placeholder="우편번호" />
                <button type="button">우편번호 검색</button>
                <input type="text" placeholder="주소를 입력해주세요." />
                <input type="text" placeholder="상세주소" />
            </div>

            <hr />

            <div>
                <span>유튜브 링크</span>
                <input type="text" placeholder="링크를 입력해주세요." />
            </div>

            <hr />

            <section>
                <span>사진 첨부</span>

                <div className={styles.imageList}>
                    {showImgUrls.map((showImgUrl, index) => (
                        <div key={index} className={styles.imageBox}>
                            {showImgUrl ? (
                                <div className={styles.imagePreview}>
                                    <Image fill src={showImgUrl} alt="첨부 이미지" className={styles.previewImage} />

                                    <button type="button" className={styles.editButton} onClick={() => handleUploadButtonClick(index)}>
                                        이미지 수정
                                    </button>
                                </div>
                            ) : (
                                <button type="button" className={styles.uploadButton} onClick={() => handleUploadButtonClick(index)}>
                                    <span className={styles.plus}>+</span>
                                    <span>클릭해서 사진 업로드</span>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <div>
                    <button>취소</button>
                    <button>등록</button>
                </div>

                {/* 실제 파일 선택 input */}
                <input type="file" ref={imageInput} className={styles.fileInput} accept="image/png, image/jpeg" onChange={handleImgChange} />
            </section>

        </main>
    );
}