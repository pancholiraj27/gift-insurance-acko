// pages/gift-section/page.jsx

'use client'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styles from '../../../styles/gift-section/page.module.css'
import DetailsCheck from '@/components/receivers-details/detialsChecker'
import ReceiverDetailsInput from '@/components/receivers-details/receiverDetails'
import InsuranceDetailsInput from '@/components/receivers-details/insuranceDetails'
import { PrimaryButton, SecondaryButton } from '@acko-tech/building-blocks.ui.button'
import { ThemeProvider, AckoMainTheme } from '@acko-tech/building-blocks.ui.theme'
import PaymentDetails from '@/components/receivers-details/paymentDetails'
import CommonHeader from '@acko-tech/building-blocks.ui.common-header-desktop'
import LobChecker from '@/components/receivers-details/lobChecker'
import { useSearchParams } from 'next/navigation'
import TravelINsuranceDetail from '@/components/receivers-details/travelDetails'

const Page = () => {
  const searchParams = useSearchParams()
  const [lob, setLob] = useState('auto')
  const searchData = searchParams.get('auto')
  const searchData2 = searchParams.get('travel')

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://efc9-115-244-209-34.ngrok.io/get-gifting-options')
        const data = await response.json()
        setQuestionsData(data)

        // Update lob based on searchData
        const searchData = searchParams.get('lob')
        if (searchData === 'auto' && searchData !== null) {
          console.log(searchData)
          setLob('auto')
        } else {
          setLob('travel')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        // Handle the error gracefully, e.g., set default data or display an error message
      }
    }

    fetchData()
  }, [searchParams])

  const [giftID, setGiftID] = useState()
  const [expectedPremium, setExpectedPremium] = useState()
  const [orderID, setOrderID] = useState()
  const [questionsData, setQuestionsData] = useState(null)
  const [stage, setStage] = useState(0)
  const [userName, setUserName] = useState('')
  const [userMobileNumber, setUserMobileNumber] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [receiverDetailsValid, setReceiverDetailsValid] = useState(false)
  const [insuranceDetailsValid, setInsuranceDetailsValid] = useState(false)
  const [travelDetailsValid, setTravelDetailsValid] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [paymentDetails, setPaymentDetails] = useState(null)
  // insurance
  const [whatInsurance, setWhatInsurance] = useState({ displayValue: '', value: '' })
  const [vehicleAge, setVehicleAge] = useState({ displayValue: '', value: '' })
  const [ownerAge, setOwnerAge] = useState({ displayValue: '', value: '' })
  const [pincode, setPincode] = useState('')
  // travel
  const [travelType, setTravelType] = useState({ displayValue: '', value: '' })
  const [numberOfMembers, setNumberOfMembers] = useState({ displayValue: '', value: '' })
  const [modeOfTravel, setModeOfTravel] = useState({ displayValue: '', value: '' })
  const [theftCoverage, setTheftCoverage] = useState('')

  // payment
  const [selectedGiftType, setSelectedGiftType] = useState('Default')
  const [customMessage, setCustomMessage] = useState('Gift To you')

  const data = [whatInsurance, vehicleAge, ownerAge, pincode, userName, userMobileNumber, userEmail]

  // gift id

  const handleContinue = async () => {
    if (stage === 0) {
      // Check both insurance and travel details validity
      if ((lob === 'auto' && insuranceDetailsValid) || (lob === 'travel' && travelDetailsValid)) {
        setStage(1)
        setIsButtonDisabled(true)
      }
    } else if (stage === 1 && receiverDetailsValid) {
      const axios = require('axios')

      let data
      if (searchData) {
        data = JSON.stringify({
          lob: 'auto',
          questions: [
            {
              id: 1,
              answer: whatInsurance.value,
            },
            {
              id: 2,
              answer: vehicleAge.value,
            },
            {
              id: 3,
              answer: ownerAge.value,
            },
            {
              id: 4,
              answer: pincode,
            },
          ],
        })
      } else {
        data = JSON.stringify({
          lob: 'travel',
          questions: [
            {
              id: 1,
              answer: travelType,
            },
            {
              id: 2,
              answer: parseInt(numberOfMembers),
            },
            {
              id: 3,
              answer: modeOfTravel,
            },
            {
              id: 4,
              answer: parseInt(theftCoverage),
            },
          ],
        })
      }

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://efc9-115-244-209-34.ngrok.io/create-lead',
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true,
        },
        data: data,
      }

      axios
        .request(config)
        .then(response => {
          const { expectedPremium, giftId } = response.data
          setExpectedPremium(expectedPremium)
          setGiftID(giftId)
          setStage(2)
          setIsButtonDisabled(false)
        })
        .catch(error => {
          console.log(error)
        })
    } else if (stage === 2) {
      const axios = require('axios')
      console.log(giftID, 'from here')
      let data = JSON.stringify({
        giftId: giftID,
        phoneNo: parseInt(userMobileNumber),
        email: userEmail,
        note: customMessage,
        bannerId: selectedGiftType,
        deliveryDate: '1701336882',
        gifteeName: userName,
      })

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://efc9-115-244-209-34.ngrok.io/create-order',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }

      axios
        .request(config)
        .then(response => {
          const { orderEkey } = response.data
          window.location.href = `https://payment-service-ui-ng.ackodev.com/?id=${orderEkey}`
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const handleReturn = () => {
    if (stage > 0) {
      setStage(stage - 1)
      setIsButtonDisabled(true)
    }
  }

  useEffect(() => {
    if (stage === 0) {
      // Check both insurance and travel details validity
      if ((lob === 'auto' && insuranceDetailsValid) || (lob === 'travel' && travelDetailsValid)) {
        setIsButtonDisabled(false)
      }
    } else if (stage === 1 && receiverDetailsValid) {
      setIsButtonDisabled(false)
    }
  }, [stage, insuranceDetailsValid, travelDetailsValid, receiverDetailsValid])

  return (
    <>
      {questionsData ? (
        <ThemeProvider theme={AckoMainTheme}>
          <CommonHeader purpleVariant={false} isLoggedIn={true} requestUrl="/" profileURL="/" largeHeader hideBorder />
          <div>
            <div className={styles.receiversSection}>
              <DetailsCheck currentStage={stage} />
              {stage === 0 && (
                <div className={styles.noNeedDiv}>
                  {lob === 'auto' ? (
                    <InsuranceDetailsInput
                      whatInsurance={whatInsurance}
                      setWhatInsurance={setWhatInsurance}
                      questions={questionsData}
                      onInsuranceDetailsFilled={setInsuranceDetailsValid}
                      vehicleAge={vehicleAge}
                      setVehicleAge={setVehicleAge}
                      ownerAge={ownerAge}
                      setOwnerAge={setOwnerAge}
                      pincode={pincode}
                      setPincode={setPincode}
                    />
                  ) : (
                    <TravelINsuranceDetail
                      questions={questionsData}
                      onInsuranceDetailsFilled={setInsuranceDetailsValid}
                      onTravelDetailsFilled={setTravelDetailsValid}
                      travelType={travelType}
                      setTravelType={setTravelType}
                      numberOfMembers={numberOfMembers}
                      setNumberOfMembers={setNumberOfMembers}
                      modeOfTravel={modeOfTravel}
                      setModeOfTravel={setModeOfTravel}
                      theftCoverage={theftCoverage}
                      setTheftCoverage={setTheftCoverage}
                      whatInsurance={whatInsurance}
                      vehicleAge={vehicleAge}
                      ownerAge={ownerAge}
                      pincode={pincode}
                    />
                  )}
                </div>
              )}
              {stage === 1 && (
                <ReceiverDetailsInput
                  userName={userName}
                  setUserName={setUserName}
                  userMobileNumber={userMobileNumber}
                  setUserMobileNumber={setUserMobileNumber}
                  userEmail={userEmail}
                  setUserEmail={setUserEmail}
                  onReceiverDetailsFilled={setReceiverDetailsValid}
                />
              )}
              {stage === 2 && (
                <PaymentDetails
                  onPaymentDetailsFilled={setPaymentDetails} // Pass the callback function
                  selectedGiftType={selectedGiftType}
                  setSelectedGiftType={setSelectedGiftType}
                  customMessage={customMessage}
                  setCustomMessage={setCustomMessage}
                  giftID={giftID}
                  expectedPremium={expectedPremium}
                  whatInsurance={whatInsurance}
                />
              )}
            </div>
            <div className={styles.footer}>
              {stage > 0 && (
                <SecondaryButton className={styles.btn} size="large" onClick={handleReturn}>
                  Return
                </SecondaryButton>
              )}
              <PrimaryButton size="large" disabled={isButtonDisabled} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </div>
          </div>
        </ThemeProvider>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  )
}

export default Page
