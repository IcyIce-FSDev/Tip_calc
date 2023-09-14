import Image from "next/image";
import styles from "./page.module.css";

import InputBox from "../../components/InputBox";
import OutputBox from "../../components/OutputBox";

export const metadata = {
  title: "Tip Calculator",
  description: "Tip calculator challenge by frontendmentor.io",
};

export default function Calculator() {
  return (
    <main className={styles.container}>
      <Image
        src="/tipcalc/logo.svg"
        alt="SPLITTER Logo"
        width="75"
        height="50"
        priority
      />

      <div className={styles.tipbox}>
        <InputBox />
        <OutputBox />
      </div>
    </main>
  );
}
