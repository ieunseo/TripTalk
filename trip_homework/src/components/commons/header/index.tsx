"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.menu}>
            <Link href="/">
              <img src="/logo-black-m.png" alt="Trip Trip" className={styles.logo} />
            </Link>

            <nav className={styles.nav}>
              <Link href="/" className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}>트립토크</Link>
              <Link href="/travelproducts" className={`${styles.link} ${pathname === "/travelproducts" ? styles.active : ""}`}>숙박권 구매</Link>
              <Link href="/mypage" className={`${styles.link} ${pathname === "/mypage" ? styles.active : ""}`}>마이 페이지</Link>
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