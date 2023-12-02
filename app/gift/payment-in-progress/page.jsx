'use client'
import { ThemeProvider, AckoMainTheme } from '@acko-tech/building-blocks.ui.theme'
import CommonHeader from '@acko-tech/building-blocks.ui.common-header-desktop'
import React, { useEffect, useState } from 'react'
import styles from './paymentProgress.module.css'
import { useSearchParams } from 'next/navigation'

const Page = () => {
  const [response, setResponse] = useState(false)
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')

  let button = document.getElementsByClassName('sc-gPzReC sc-hjRWVT jYRyDm')[1]

  useState(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://efc9-115-244-209-34.ngrok.io/get-mandate/${orderId}'`)
        const data = await response.json()
        if (data.mandateId !== null) {
          console.log(data.mandateId)
          setResponse(true)
        }
        // console.log('HEY I AM WORKING')
      } catch (error) {
        setResponse(false)
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])
  return (
    <ThemeProvider theme={AckoMainTheme}>
      <CommonHeader purpleVariant={false} isLoggedIn={true} requestUrl="/" profileURL="/" largeHeader hideBorder />
      <div className={styles.background}>
        <div className={styles.paymentProcess}>
          <div className={styles.paymentImgDiv}>
            {!response ? <img src="/inprocess.png" alt="in progress" /> : <img src="/success.png" alt="in progress" />}
          </div>
          <div className={styles.paymentDetails}>
            <h1>{!response ? 'We are fetching you payment' : 'Payment successful'}</h1>
            <p>{!response ? 'Don not refresh or close the app' : 'Your gift will be delivered shortly'}</p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Page
