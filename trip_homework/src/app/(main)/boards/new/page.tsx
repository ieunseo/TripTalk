"use client";

import { useMutation } from "@apollo/client/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { CREATE_BOARD } from "@/graphql/mutations";
import { uploadImage } from "@/lib/upload-image";
import styles from "./styles.module.css";

type DaumPostcode = new (options: {
    oncomplete: (data: { address: string; zonecode: string }) => void;
}) => { open: () => void };

declare global {
    interface Window {
        daum?: { Postcode: DaumPostcode };
    }
}

const getImageUrl = (path: string) => {
    if (path.startsWith("http")) return path;
    return `https://storage.googleapis.com/${path}`;
};

export default function BoardNewPage() {
    const router = useRouter();
    const [writer, setWriter] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [imageUrls, setImageUrls] = useState(["", "", ""]);
    const [uploadingIndex, setUploadingIndex] = useState(-1);

    const [createBoard, { loading }] = useMutation<{
        createBoard: { _id: string };
    }>(CREATE_BOARD);

    const isValid = Boolean(
        writer.trim() && password.trim() && title.trim() && content.trim(),
    );

    const onClickAddressSearch = () => {
        const Postcode = window.daum?.Postcode;
        if (!Postcode) return alert("주소 검색을 불러오는 중이에요.");

        new Postcode({
            oncomplete: (data) => {
                setZipCode(data.zonecode);
                setAddress(data.address);
            },
        }).open();
    };

    const onChangeImage = async (
        event: ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setUploadingIndex(index);
            const url = await uploadImage(file);
            setImageUrls((previous) =>
                previous.map((item, itemIndex) => (itemIndex === index ? url : item)),
            );
        } catch (error) {
            alert(error instanceof Error ? error.message : "업로드에 실패했어요.");
        } finally {
            setUploadingIndex(-1);
            event.target.value = "";
        }
    };

    const onClickSubmit = async () => {
        if (!isValid) return;

        try {
            const result = await createBoard({
                variables: {
                    input: {
                        writer,
                        password,
                        title,
                        contents: content,
                        youtubeUrl,
                        boardAddress: {
                            zipcode: zipCode,
                            address,
                            addressDetail: detailAddress,
                        },
                        images: imageUrls.filter((url) => url !== ""),
                    },
                },
            });

            const boardId = result.data?.createBoard._id;
            if (boardId) router.push(`/boards/${boardId}`);
        } catch (error) {
            alert(error instanceof Error ? error.message : "게시글 등록에 실패했어요.");
        }
    };

    return (
        <main className={styles.page}>
            <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
            <h1>게시물 등록</h1>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label htmlFor="writer">작성자 *</label>
                    <input id="writer" value={writer} onChange={(event) => setWriter(event.target.value)} placeholder="작성자 명을 입력해 주세요." />
                </div>
                <div className={styles.field}>
                    <label htmlFor="password">비밀번호 *</label>
                    <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="비밀번호를 입력해 주세요." />
                </div>
            </div>

            <hr className={styles.divider} />
            <div className={styles.field}>
                <label htmlFor="title">제목 *</label>
                <input id="title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="제목을 입력해 주세요." />
            </div>

            <hr className={styles.divider} />
            <div className={styles.field}>
                <label htmlFor="content">내용 *</label>
                <textarea id="content" value={content} onChange={(event) => setContent(event.target.value)} placeholder="내용을 입력해 주세요." />
            </div>

            <hr className={styles.divider} />
            <div className={styles.field}>
                <label>주소</label>
                <div className={styles.zipRow}>
                    <input className={styles.zipInput} value={zipCode} readOnly placeholder="01234" />
                    <button className={styles.zipButton} type="button" onClick={onClickAddressSearch}>우편번호 검색</button>
                </div>
                <input value={address} readOnly placeholder="주소를 검색해 주세요." />
                <input value={detailAddress} onChange={(event) => setDetailAddress(event.target.value)} placeholder="상세주소" />
            </div>

            <div className={styles.field}>
                <label htmlFor="youtube">유튜브 링크</label>
                <input id="youtube" value={youtubeUrl} onChange={(event) => setYoutubeUrl(event.target.value)} placeholder="링크를 입력해 주세요." />
            </div>

            <div className={styles.field}>
                <label>사진 첨부</label>
                <div className={styles.photoRow}>
                    {imageUrls.map((url, index) => (
                        <label className={styles.photoBox} key={index}>
                            <input type="file" accept="image/*" onChange={(event) => onChangeImage(event, index)} />
                            {url ? (
                                <img src={getImageUrl(url)} alt={`첨부 사진 ${index + 1}`} />
                            ) : (
                                <>
                                    <span className={styles.plus}>+</span>
                                    <span>{uploadingIndex === index ? "업로드 중..." : "클릭해서 사진 업로드"}</span>
                                </>
                            )}
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.buttonRow}>
                <Link className={styles.cancelButton} href="/">취소</Link>
                <button
                    className={isValid ? `${styles.submitButton} ${styles.active}` : styles.submitButton}
                    type="button"
                    disabled={!isValid || loading || uploadingIndex >= 0}
                    onClick={onClickSubmit}
                >
                    {loading ? "등록 중" : "등록하기"}
                </button>
            </div>
        </main>
    );
}
