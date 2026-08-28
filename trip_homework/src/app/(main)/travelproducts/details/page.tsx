"use client";
import Image from "next/image";
import styles from "/styles.module.css";

const productdata = [
    {},
];
export default function TravelProductsDetailPage() {
    return(
    <main className="page">
        <h1>숙박권 명이 여기에 들어갑니다</h1>
        <span>한줄설명</span>
        <p>태그</p>
        <div>
            <Image src={} alt={}/>
            <div>
                <div>0000원</div>
                <div>- 숙박권은 트립트립에서 포인트 충전후 구매할수있습니다</div>]
                <div> - 상세설명에 숙박권 사용기한을 꼭 확인해주세요.</div>
            </div>
            <div className={styles.detail}>
                <div>상세설명</div>
                <div>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</div>
            </div>
            <div>
                <div>상세위치</div>
            </div>
        </div>

    </main>);
}