"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.css";

type Reply = {
  id: number;
  writer: string;
  content: string;
  date: string;
};

type Comment = {
  id: number;
  writer: string;
  content: string;
  date: string;
  replies: Reply[];
};

const POEM = `살어리 살어리랏다 청산(靑山)에 살어리랏다
멀위랑 다래랑 먹고 청산(靑山)에 살어리랏다
얄리얄리 얄라셩 얄라리 얄라

우러라 우러라 새여 자고 니러 우러라 새여
너보다 시름 한 나도 자고 니러 우노라
얄리얄리 얄라셩 얄라리 얄라

가던 새 가던 새 본다 믈 아래 가던 새 본다
잉무든 장글란 가지고 믈 아래 가던 새 본다
얄리얄리 얄라셩 얄라리 얄라

이링공 뎌링공 하야 나즈란 디내와손뎌
오리도 가리도 없슨 바므란 또 엇디 하리라
얄리얄리 얄라셩 얄라리 얄라

어듸라 더디던 돌코 누리라 마치던 돌코
믜리도 괴리도 없이 맞아서 우니노라
얄리얄리 얄라셩 얄라리 얄라`;

const REPLY_SAMPLE =
  "살으리 살으리랏다 청산에 살으리랏다\n머루랑 다래를 먹고 청산에 살으리랏다\n얄리얄리 얄랑성 얄라리 얄라";

const initialComments: Comment[] = [
  {
    id: 1,
    writer: "홍길동",
    content: REPLY_SAMPLE,
    date: "2024.11.11",
    replies: [
      { id: 11, writer: "판매자", content: REPLY_SAMPLE, date: "2024.11.11" },
      {
        id: 12,
        writer: "여유로운 삶",
        content: REPLY_SAMPLE,
        date: "2024.11.11",
      },
    ],
  },
  {
    id: 2,
    writer: "자유로운 영혼",
    content: REPLY_SAMPLE,
    date: "2024.11.11",
    replies: [],
  },
];

type ProductDetailProps = {
  productId: string;
};

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [comments, setComments] = useState(initialComments);
  const [isPrivate, setIsPrivate] = useState(false);
  const [inquiry, setInquiry] = useState("");
  const [openReplyId, setOpenReplyId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [editingReplyId, setEditingReplyId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const handleAddInquiry = () => {
    if (!inquiry) return;

    setComments([
      ...comments,
      {
        id: Date.now(),
        writer: "나",
        content: inquiry,
        date: "2024.11.11",
        replies: [],
      },
    ]);
    setInquiry("");
  };

  const toggleReplyForm = (commentId: number) => {
    setOpenReplyId(openReplyId === commentId ? null : commentId);
    setReplyText("");
  };

  const handleAddReply = (commentId: number) => {
    if (!replyText) return;

    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: Date.now(),
                  writer: "나",
                  content: replyText,
                  date: "2024.11.11",
                },
              ],
            }
          : comment,
      ),
    );
    setOpenReplyId(null);
    setReplyText("");
  };

  const startEditReply = (reply: Reply) => {
    setEditingReplyId(reply.id);
    setEditingText(reply.content);
  };

  const handleEditReply = (commentId: number, replyId: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? { ...reply, content: editingText }
                  : reply,
              ),
            }
          : comment,
      ),
    );
    setEditingReplyId(null);
  };

  const handleDeleteReply = (commentId: number, replyId: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.filter((reply) => reply.id !== replyId),
            }
          : comment,
      ),
    );
  };

  return (
    <article className={styles.article}>
      <div className={styles.topRow}>
        <div>
          <h1>포항 : 숙박권 명이 여기에 들어갑니다 ({productId})</h1>
          <p className={styles.subtitle}>모던한 분위기의 감도높은 숙소</p>
          <p className={styles.tags}>#6인 이하 #건식 사우나 #애견동반 가능</p>
        </div>

        <div className={styles.metaIcons}>
          <button type="button" aria-label="삭제">
            <Image src="/icons/delete.svg" alt="" width={18} height={18} />
          </button>
          <button type="button" aria-label="링크 복사">
            <Image src="/icons/link.svg" alt="" width={18} height={18} />
          </button>
          <button type="button" aria-label="위치 보기">
            <Image src="/icons/location.svg" alt="" width={18} height={18} />
          </button>
          <span className={styles.dateBadge}>
            <Image src="/icons/bookmark.svg" alt="" width={14} height={14} />
            24
          </span>
        </div>
      </div>

      <div className={styles.mainRow}>
        <div className={styles.gallery}>
          <Image
            className={styles.mainImage}
            src="/images/a.png"
            alt="숙소 대표 사진"
            width={640}
            height={480}
          />

          <div className={styles.thumbList}>
            <Image
              src="/images/b.png"
              alt="숙소 사진"
              width={180}
              height={136}
            />
            <Image
              src="/images/c.png"
              alt="숙소 사진"
              width={180}
              height={136}
            />
            <Image
              src="/images/d.png"
              alt="숙소 사진"
              width={180}
              height={136}
            />
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.priceBox}>
            <strong>32,500원</strong>
            <ul>
              <li>
                숙박권은 트립토크앱에서 온라인으로 결제 후 구매하실 수 있어요.
              </li>
              <li>상세 설명과 숙소의 사진/영상을 꼭 확인해 주세요.</li>
            </ul>
            <button className={styles.buyButton} type="button">
              구매하기
            </button>
          </div>

          <div className={styles.sellerBox}>
            <strong>판매자</strong>
            <div className={styles.seller}>
              <span className={styles.avatar}>👤</span>
              <span>김상훈</span>
            </div>
          </div>
        </aside>
      </div>

      <section className={styles.section}>
        <h2>상세 설명</h2>
        <p className={styles.description}>{POEM}</p>
      </section>

      <section className={styles.section}>
        <h2>상세 위치</h2>
        <div className={styles.mapBox}>
          <Image src="/icons/location.svg" alt="" width={28} height={28} />
          <p>포항시 남구 대잠동 (상세 주소는 예시예요.)</p>
        </div>
      </section>

      <section className={styles.section}>
        <label className={styles.privateCheck}>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(event) => setIsPrivate(event.target.checked)}
          />
          문의하기
        </label>

        <div className={styles.inquiryBox}>
          <textarea
            maxLength={100}
            value={inquiry}
            onChange={(event) => setInquiry(event.target.value)}
            placeholder="문의사항을 입력해 주세요."
          />
          <span className={styles.charCount}>{inquiry.length}/100</span>
        </div>

        <div className={styles.inquiryButtonRow}>
          <button
            className={styles.inquiryButton}
            type="button"
            disabled={!inquiry}
            onClick={handleAddInquiry}
          >
            문의 하기
          </button>
        </div>

        {comments.length === 0 ? (
          <p className={styles.emptyState}>등록된 문의사항이 없어요.</p>
        ) : (
          <ul className={styles.commentList}>
            {comments.map((comment) => (
              <li className={styles.comment} key={comment.id}>
                <div className={styles.commentHeader}>
                  <span className={styles.avatar}>👤</span>
                  <strong>{comment.writer}</strong>
                </div>

                <p className={styles.commentContent}>{comment.content}</p>

                <div className={styles.commentFooter}>
                  <time>{comment.date}</time>
                  <button
                    type="button"
                    onClick={() => toggleReplyForm(comment.id)}
                  >
                    답변 하기
                  </button>
                </div>

                {comment.replies.length > 0 && (
                  <ul className={styles.replyList}>
                    {comment.replies.map((reply) => (
                      <li className={styles.reply} key={reply.id}>
                        {editingReplyId === reply.id ? (
                          <>
                            <textarea
                              value={editingText}
                              onChange={(event) =>
                                setEditingText(event.target.value)
                              }
                            />
                            <div className={styles.replyButtonRow}>
                              <button
                                type="button"
                                onClick={() => setEditingReplyId(null)}
                              >
                                취소
                              </button>
                              <button
                                className={styles.primaryButton}
                                type="button"
                                onClick={() =>
                                  handleEditReply(comment.id, reply.id)
                                }
                              >
                                수정하기
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className={styles.commentHeader}>
                              <span className={styles.avatar}>👤</span>
                              <strong>{reply.writer}</strong>

                              <div className={styles.replyIcons}>
                                <button
                                  type="button"
                                  aria-label="답변 수정"
                                  onClick={() => startEditReply(reply)}
                                >
                                  <Image
                                    src="/icons/edit.svg"
                                    alt=""
                                    width={14}
                                    height={14}
                                  />
                                </button>
                                <button
                                  type="button"
                                  aria-label="답변 삭제"
                                  onClick={() =>
                                    handleDeleteReply(comment.id, reply.id)
                                  }
                                >
                                  <Image
                                    src="/icons/close.svg"
                                    alt=""
                                    width={14}
                                    height={14}
                                  />
                                </button>
                              </div>
                            </div>

                            <p className={styles.commentContent}>
                              {reply.content}
                            </p>
                            <time>{reply.date}</time>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                )}

                {openReplyId === comment.id && (
                  <div className={styles.replyForm}>
                    <textarea
                      value={replyText}
                      onChange={(event) => setReplyText(event.target.value)}
                      placeholder="댓글을 입력해 주세요."
                    />
                    <div className={styles.replyButtonRow}>
                      <button
                        type="button"
                        onClick={() => toggleReplyForm(comment.id)}
                      >
                        취소
                      </button>
                      <button
                        className={styles.primaryButton}
                        type="button"
                        onClick={() => handleAddReply(comment.id)}
                      >
                        답변 하기
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
