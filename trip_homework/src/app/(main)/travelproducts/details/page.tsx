"use client";

import Image from "next/image";
import styles from "./styles.module.css";

const productData = [
    {
        id: 1,
        title: "포항 : 숙박권 명이 여기에 들어갑니다",
        intro: "모던한 분위기의 감도높은 숙소",
        tags: ["6인 이하", "감성 사우나", "애견동반 가능"],
        images: [
            "/images/a.png",
            "/images/a.png",
            "/images/a.png",
            "/images/a.png",
        ],
        detail: "살며시 설레리듯한 침실과 편안한 공간입니다. 여행의 즐거움과 여유를 느낄 수 있는 숙소입니다.",
        price: 32500,
        seller: {
            name: "김상훈",
            profile: "/images/a.png",
        },
        questions: [
            {
                id: 1,
                name: "김동준",
                profile: "/images/a.png",
                content: "살겠노라 살겠노라. 청산에 살겠노라. 아무랑 다래랑 먹고 청산에 살겠노라.",
                date: "2024.11.11",
                replies: [],
            },
            {
                id: 2,
                name: "저승운은 신이",
                profile: "/images/a.png",
                content: "살겠노라 살겠노라. 청산에 살겠노라. 아무랑 다래랑 먹고 청산에 살겠노라.",
                date: "2024.11.11",
                replies: [
                    {
                        id: 1,
                        name: "판매자",
                        profile: "/images/a.png",
                        content: "살겠노라 살겠노라. 청산에 살겠노라. 아무랑 다래랑 먹고 청산에 살겠노라.",
                        date: "2024.11.11",
                    },
                    {
                        id: 2,
                        name: "판매자",
                        profile: "/images/a.png",
                        content: "살겠노라 살겠노라. 청산에 살겠노라. 아무랑 다래랑 먹고 청산에 살겠노라.",
                        date: "2024.11.11",
                    },
                ],
            },
        ],
    },
];

export default function TravelProductsDetailPage() {
    const product = productData[0];

    return (
        <main className={styles.page}>
            <section className={styles.top}>
                <h1>{product.title}</h1>
                <span>{product.intro}</span>

                <p>
                    {product.tags.map((tag) => `#${tag}`).join(" ")}
                </p>
            </section>

            <section className={styles.product}>
                <div className={styles.left}>
                    <div className={styles.images}>
                        <div className={styles.mainImage}>
                            <Image src={product.images[0]} alt="숙소 이미지" fill />
                        </div>

                        <div className={styles.subImages}>
                            {product.images.slice(1).map((image, index) => (
                                <div key={index}>
                                    <Image src={image} alt="숙소 이미지" fill />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.detail}>
                        <h2>상세 설명</h2>
                        <p>{product.detail}</p>
                    </div>

                    <div className={styles.location}>
                        <h2>상세 위치</h2>

                        <div className={styles.map}>
                            지도 영역
                        </div>
                    </div>

                    <div className={styles.question}>
                        <div className={styles.questionTitle}>
                            <span className={styles.square}></span>
                            <strong>문의하기</strong>
                        </div>

                        <div className={styles.textarea}>
                            <textarea placeholder="문의사항을 입력해 주세요." maxLength={100} />
                            <span>0/100</span>
                        </div>

                        <button>문의 하기</button>
                    </div>

                    {/* 문의 목록 */}
                    <div className={styles.questionList}>
                        {product.questions.length === 0 ? (
                            <div className={styles.empty}>
                                등록된 문의사항이 없습니다.
                            </div>
                        ) : (
                            product.questions.map((question) => (
                                <div className={styles.questionItem} key={question.id}>
                                    <div className={styles.user}>
                                        <div className={styles.profile}>
                                            <Image src={question.profile} alt="프로필 이미지" fill />
                                        </div>

                                        <span>{question.name}</span>
                                    </div>

                                    <p className={styles.questionContent}>
                                        {question.content}
                                    </p>

                                    <span className={styles.date}>
                    {question.date}
                </span>

                                    <button className={styles.replyBtn}>
                                        💬 답글 보기
                                    </button>

                                    {/* 판매자 답글 */}
                                    {question.replies.map((reply) => (
                                        <div className={styles.reply} key={reply.id}>
                                            <span className={styles.replyArrow}>↳</span>

                                            <div className={styles.replyBody}>
                                                <div className={styles.replyTop}>
                                                    <div className={styles.user}>
                                                        <div className={styles.profile}>
                                                            <Image src={reply.profile} alt="판매자 프로필" fill />
                                                        </div>

                                                        <span>{reply.name}</span>
                                                    </div>

                                                    <div className={styles.replyAction}>
                                                        <button>✎</button>
                                                        <button>×</button>
                                                    </div>
                                                </div>

                                                <p className={styles.questionContent}>
                                                    {reply.content}
                                                </p>

                                                <span className={styles.date}>
                                {reply.date}
                            </span>
                                            </div>
                                        </div>
                                    ))}

                                    {/* 답글 작성 */}
                                    {question.id === 3 && (
                                        <div className={styles.replyWrite}>
                                            <div className={styles.textarea}>
                                                <textarea placeholder="답변 내용을 입력해 주세요." maxLength={100} />
                                                <span>0/100</span>
                                            </div>

                                            <div className={styles.replyButtons}>
                                                <button className={styles.cancelBtn}>취소</button>
                                                <button className={styles.submitBtn}>답변 하기</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <aside className={styles.side}>
                    <div className={styles.buy}>
                        <strong>{product.price.toLocaleString()}원</strong>

                        <ul>
                            <li>숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.</li>
                            <li>상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.</li>
                        </ul>

                        <button>구매하기</button>
                    </div>

                    <div className={styles.seller}>
                        <h3>판매자</h3>

                        <div>
                            <div className={styles.profile}>
                                <Image src={product.seller.profile} alt="판매자 프로필" fill />
                            </div>

                            <span>{product.seller.name}</span>
                        </div>
                    </div>
                </aside>
            </section>
        </main>
    );
}