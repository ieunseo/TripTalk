import styles from "./styles.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.menu}>
                    <img src="/logo-black-m.png" alt="Trip Trip" className={styles.logo} />

                    <nav className={styles.nav}>
                        <a href="#" className={styles.link}>트립토크</a>
                        <a href="#" className={`${styles.link} ${styles.active}`}>숙박권 구매</a>
                        <a href="#" className={styles.link}>마이 페이지</a>
                    </nav>
                </div>

                <button className={styles.profile}>
                    <span className={styles.profileIcon}>♙</span>
                    <span className={styles.arrow}>▾</span>
                </button>
            </div>
        </header>
    );
}