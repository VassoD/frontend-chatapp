import type { ReactElement } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home = (): ReactElement => {
  const year = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <article className={styles.card}>
          <Link href="/conversations">
            <h1>Leboncoin Conversations</h1>
          </Link>
        </article>
      </main>

      <footer className={styles.footer}>&copy; leboncoin - {year}</footer>
    </div>
  );
};

export default Home;
