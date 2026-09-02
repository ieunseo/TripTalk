"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {ChangeEvent, FormEvent, useState} from "react";
import "react-quill-new/dist/quill.snow.css";
import styles from "./styles.module.css";
import {useMutation} from "@apollo/client/react";
import {gql} from "@apollo/client";
import {router} from "next/client";
import {uploadImage} from "@/lib/upload-image";

// Quill은 브라우저에서만 돌려야 해서 ssr을 꺼놓고 불러와요.
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const CREATE_TRAVELPRODUCT = gql`
  mutation CreateTravelproduct($input: CreateTravelproductInput!) {
    createTravelproduct(createTravelproductInput: $input) {
      _id
    }
  }
`;

type DaumPostcode = new (options: {
    oncomplete: (data: { address: string }) => void;
}) => { open: () => void };

declare global {
    interface Window {
        daum?: { Postcode: DaumPostcode };
    }
}

type CreateData = {
    createTravelproduct: { _id: string };
};

const getImageUrl = (path: string) => {
    if (path.startsWith("http")) return path;
    return `https://storage.googleapis.com/${path}`;
};
export default function TravelProductNewPage() {
    const [productName, setProductName] = useState("");
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [remarks, setRemarks] = useState("");
    const [contents, setContents] = useState("");
    const [price, setPrice] = useState(0);
    const [tags, setTags] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [geocoding, setGeocoding] = useState(false);

    const [createTravelproduct, {loading}] =
        useMutation<CreateData>(CREATE_TRAVELPRODUCT);

    const onClickAddressSearch = () => {
        const Postcode = window.daum?.Postcode;

        if (!Postcode) {
            alert("주소 검색 스크립트를 불러오는 중입니다.");
            return;
        }
        new Postcode({
            oncomplete: async (data) => {
                setAddress(data.address);
                setGeocoding(true);

                try {
                    // 선택한 주소를 좌표로 바꾼 뒤 위도·경도 state를 함께 갱신해요.
                    const response = await fetch(
                        `/api/geocode?address=${encodeURIComponent(data.address)}`,
                    );
                    const coordinate = (await response.json()) as {
                        lat?: number;
                        lng?: number;
                        message?: string;
                    };

                    if (
                        !response.ok ||
                        coordinate.lat === undefined ||
                        coordinate.lng === undefined
                    ) {
                        throw new Error(coordinate.message ?? "좌표를 찾지 못했어요.");
                    }

                    setLat(String(coordinate.lat));
                    setLng(String(coordinate.lng));
                } catch (error) {
                    alert(
                        error instanceof Error ? error.message : "좌표 검색에 실패했어요.",
                    );
                } finally {
                    setGeocoding(false);
                }
            },
        }).open();
    };

    const onChangeFiles = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);
        if (files.length === 0) return;

        const validFiles = files.filter((file) => {
            if (!file.type.startsWith("image/")) return false;
            if (file.size > 5 * 1024 * 1024) return false;
            return true;
        });

        if (validFiles.length !== files.length) {
            alert("이미지 파일만 가능하며 파일당 5MB 이하여야 합니다.");
        }

        try {
            setUploading(true);

            // 여러 파일 업로드가 모두 끝나면 URL 배열을 state에 저장해요.
            const uploadedUrls = await Promise.all(
                validFiles.map((file) => uploadImage(file)),
            );
            setImageUrls((previous) => [...previous, ...uploadedUrls]);
        } catch (error) {
            alert(error instanceof Error ? error.message : "업로드에 실패했어요.");
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!productName || !remarks || !contents || price <= 0) {
            alert("숙박권 정보와 가격을 입력해 주세요.");
            return;
        }

        if (imageUrls.length === 0) {
            alert("이미지를 한 장 이상 업로드해 주세요.");
            return;
        }

        try {
            const result = await createTravelproduct({
                variables: {
                    input: {
                        productName,
                        remarks,
                        contents,
                        price: Number(price),
                        tags: tags
                            .split(",")
                            .map((tag) => tag.trim())
                            .filter((tag) => tag !== ""),
                        images: imageUrls,
                        travelproductAddress: {
                            address,
                            detailAddress,
                            lat: Number(lat),
                            lng: Number(lng),
                        },
                    },
                },
                context: { apiName: "practice" },
            });

            const productId = result.data?.createTravelproduct._id;
            if (productId) router.push(`/practice/travelproducts/${productId}`);
        } catch (error) {
            alert(
                error instanceof Error ? error.message : "숙박권 등록에 실패했어요.",
            );
        }
    };

    const mapLat = Number(lat) || 37.5665;
    const mapLng = Number(lng) || 126.978;
    const mapUrl =
        `https://www.openstreetmap.org/export/embed.html?` +
        `bbox=${mapLng - 0.01}%2C${mapLat - 0.01}%2C${mapLng + 0.01}%2C${mapLat + 0.01}` +
        `&layer=mapnik&marker=${mapLat}%2C${mapLng}`;


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
                        onChange={(event) => setPrice(Number(event.target.value))}
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
