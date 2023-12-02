// Import necessary modules
import React, { useState } from 'react'
import styles from '../../styles/gift-section/gift-type.module.css'
import Link from 'next/link'

const GiftType = ({ questions }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  console.log(selectedOption)
  const handleOptionClick = lob => {
    setSelectedOption(lob)
  }

  const isGiftButtonDisabled = !selectedOption

  return (
    <div className={styles.giftType}>
      <h1>Gift a policy to your loved ones!</h1>
      <p>Get insurance now...</p>
      <div className={styles.selectType}>
        <div
          className={`${styles.option} ${selectedOption === 'auto' ? styles.selected : ''}`}
          onClick={() => handleOptionClick(questions.lobs[0].lob)}>
          <img src="/car.png" alt="Auto" />
          <span>AUTO</span>
        </div>
        <div
          className={`${styles.option} ${selectedOption === 'travel' ? styles.selected : ''}`}
          onClick={() => handleOptionClick(questions.lobs[1].lob)}>
          <img src="/travel.png" alt="Travel" />
          <span>TRAVEL</span>
        </div>
      </div>
      <div className={styles.giftClaim}>
        <Link
          className={`${styles.giftClaimButton} ${isGiftButtonDisabled ? styles.disabled : ''}`}
          href={isGiftButtonDisabled ? '' : `/gift/receivers-details?lob=${selectedOption}`}>
          <button disabled={isGiftButtonDisabled}>Gift</button>
        </Link>
        <Link className={styles.giftClaimButton} href={'/gift/claim-gift'}>
          <button>Claim</button>
        </Link>
      </div>
    </div>
  )
}

export default GiftType
