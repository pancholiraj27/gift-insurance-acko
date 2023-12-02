import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <div className={styles.homePage}>
        <img src="/ackoHome.png" alt="" />
      </div>
      <Link href={'/gift'}>
        <div className={styles.buttonGIFT}>Gift Insurance </div>
      </Link>
      <div className={styles.newSHow}>
        <img src="/red.png" alt="" />
        <p>NEW</p>
      </div>
    </>
  )
}
