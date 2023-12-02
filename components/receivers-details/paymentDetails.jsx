import React, { useState } from 'react'
import styles from '@/styles/gift-section/receiverDetails.module.css'
import { Input } from '@acko-tech/building-blocks.ui.input'

const PaymentDetails = ({
  selectedGiftType,
  expectedPremium,
  setSelectedGiftType,
  customMessage,
  setCustomMessage,
  giftID,
  whatInsurance,
}) => {
  const handleGiftTypeChange = giftType => {
    setSelectedGiftType(giftType)
  }

  const getImageForGiftType = () => {
    const imagePaths = {
      Default: '/celebration.png',
      Birthday: '/birthday.png',
      Wedding: '/wedding.png',
      Diwali: '/diwali.png',
    }

    return imagePaths[selectedGiftType] || imagePaths.Default
  }

  const handleCustomMessageChange = e => {
    // Limit the custom message to 30 characters
    const inputText = e.target.value
    if (inputText.length <= 30) {
      setCustomMessage(inputText)
    }
  }

  const [date, setDate] = useState()

  return (
    <div className={styles.receiversDetails}>
      <div className={styles.box2}>
        <div className={styles.box2Imgdiv}>
          <img src={getImageForGiftType()} alt="img" />
        </div>
        <div className={styles.insuranceAmount}>
          <div>
            <h2>{whatInsurance.displayValue} Insurance</h2>
            <p>Redeemable upto</p>
          </div>
          <div>
            <h3>₹ {expectedPremium}</h3>
          </div>
        </div>
        <div className={styles.insuranceGiftBy}>
          <div>
            <h4 className="giftBy">Raj has sent you a Gift!</h4>
          </div>
          <span>"{customMessage}"</span>
        </div>
        <div className={styles.customMessage}>
          <Input
            name="fullName"
            placeHolder="Enter your message"
            type="text"
            value={customMessage}
            onChange={e => setCustomMessage(e.target.value)}
          />
          <Input
            name="delivery date"
            placeHolder="Select Delivery Date"
            type="date"
            value={date}
            onChange={e => console.log(e.target)}
          />
        </div>
        <div className={styles.giftType}>
          {['Default', 'Birthday', 'Wedding', 'Diwali'].map(giftType => (
            <div
              key={giftType}
              onClick={() => handleGiftTypeChange(giftType)}
              className={selectedGiftType === giftType ? styles.selectedGiftType : null}>
              {giftType}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PaymentDetails
