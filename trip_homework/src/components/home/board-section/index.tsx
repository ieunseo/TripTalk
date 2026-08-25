"use client";

const formatDate = (date: string) => date.slice(0, 10).replaceAll("-", ".");

export default function BoardSection() {
    return (
        <section>
            <section>
                <h2>끝여름 낭만있게 마무리 하고 싶다면?</h2>

                <div>
                    <article>
                        추천 숙소 1
                    </article>

                    <article>
                        추천 숙소 2
                    </article>
                </div>
            </section>

            <section>
                프로모션 배너
            </section>

            <section>
                <h2>여기에서만 예약할 수 있는 숙소</h2>

                <div>
                    날짜 / 지역 검색
                </div>

                <div>
                    숙소 카테고리
                </div>

                <div>
                    <article>
                        숙소 카드
                    </article>

                    <article>
                        숙소 카드
                    </article>

                    <article>
                        숙소 카드
                    </article>

                    <article>
                        숙소 카드
                    </article>
                </div>
            </section>
        </section>
    );
}