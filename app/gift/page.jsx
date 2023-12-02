'use client'
import Extra from '@/components/gift-section/extra'
import GiftType from '@/components/gift-section/gift-type'
import React, { useEffect, useState } from 'react'
import styles from './giftPage.module.css'
import { ThemeProvider, AckoMainTheme } from '@acko-tech/building-blocks.ui.theme'
import CommonHeader from '@acko-tech/building-blocks.ui.common-header-desktop'

const Page = () => {
  const [questionsData, setQuestionsData] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://efc9-115-244-209-34.ngrok.io/get-gifting-options')
        const data = await response.json()
        setQuestionsData(data)
        return data
      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, [])

  return (
    <ThemeProvider theme={AckoMainTheme}>
      <CommonHeader
        purpleVariant={false}
        // UserApiResponse={UserApiData}
        isLoggedIn={true}
        requestUrl="/"
        profileURL="/"
        largeHeader
        hideBorder
      />
      <div>
        <div className={styles.giftSection}>
          <GiftType questions={questionsData} />
          <Extra />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Page
