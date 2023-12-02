'use client'
import React, { useState } from 'react'
import styles from './claim.module.css'
import CommonHeader from '@acko-tech/building-blocks.ui.common-header-desktop'
import { ThemeProvider, AckoMainTheme } from '@acko-tech/building-blocks.ui.theme'
import { Input } from '@acko-tech/building-blocks.ui.input'

const Page = () => {
  const [giftid, setGiftId] = useState('')
  return (
    <ThemeProvider theme={AckoMainTheme}>
      <CommonHeader purpleVariant={false} isLoggedIn={true} requestUrl="/" profileURL="/" largeHeader hideBorder />

      <div className={styles.claimGift}>
        <div className={styles.claimImg}>
          <img src="/claim.png" alt="" />
        </div>

        <div className={styles.inputFiledClaim}>
          <Input
            name="Enter Your Gift ID"
            type="text"
            className="inputElement"
            value={giftid}
            onChange={e => setGiftId(e.target.value)}
            labelText={'GIFT ID'}
          />
          <button
            onClick={() => (window.location.href = 'http://localhost:3000/gift/payment-in-progress')}
            className={styles.claimButton}>
            CLAIM
          </button>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Page
