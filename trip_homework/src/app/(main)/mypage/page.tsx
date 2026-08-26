import styles from "./styles.module.css";
import HeroBanner from "@/components/home/hero-banner";

export default function MyPage(){
    return (
        <div>
            <h1>마이페이지</h1>
            <section>
                <p>내정보</p>
                <div>
                    <img src="/images/a.png" className="profileImg" />
                    <p>이은서</p>
                </div>
                <hr />
                <div className={styles.point}>
                    23,000P
                </div>
            </section>
            <button>거래내역&북마크</button>
            <button>포인트 사용 내역</button>
            <button>비밀번호 변경</button>
            {/*랜더링영역*/}
        </div>


    )

}