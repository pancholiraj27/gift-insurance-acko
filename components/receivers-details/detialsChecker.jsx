// components/gift-section/DetailsCheck.jsx

import React from 'react'
import styles from '@/styles/gift-section/detailsCheck.module.css'

const DetailsCheck = ({ currentStage }) => {
  return (
    <div className={styles.receiversQuestion}>
      <ol>
        <div>
          <span className={currentStage == 0 ? `${styles.highlighted}` : ''}>1</span>
          <li className={currentStage == 0 ? `${styles.highlightedBorder}` : ''}>Insurance details</li>
        </div>
        <div>
          <span className={currentStage == 1 ? `${styles.highlighted}` : ''}>2</span>
          <li className={currentStage == 1 ? `${styles.highlightedBorder}` : ''}>Receiver details</li>
        </div>
        <div>
          <span className={currentStage == 2 ? `${styles.highlighted}` : ''}>3</span>
          <li className={currentStage == 2 ? `${styles.highlightedBorder}` : ''}>Payment</li>
        </div>
      </ol>
    </div>
  )
}

export default DetailsCheck
