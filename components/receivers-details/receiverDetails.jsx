// components/receivers-details/receiverDetails.jsx

import React, { useEffect } from 'react'
import { Input } from '@acko-tech/building-blocks.ui.input'
import styles from '@/styles/gift-section/receiverDetails.module.css'

const ReceiverDetailsInput = ({
  userName,
  setUserName,
  userMobileNumber,
  setUserMobileNumber,
  userEmail,
  setUserEmail,
  onReceiverDetailsFilled,
}) => {
  const isReceiverDetailsValid = userName && userMobileNumber && userEmail

  useEffect(() => {
    onReceiverDetailsFilled(isReceiverDetailsValid)
  }, [isReceiverDetailsValid, onReceiverDetailsFilled])

  return (
    <>
      <div className={styles.receiversDetails}>
        <div className={styles.box}>
          <h1>Enter Receiver details</h1>
          <Input
            name="fullName"
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            labelText="Full Name"
            required
          />
          <Input
            name="mobile"
            type="text"
            className="inputElement"
            value={userMobileNumber}
            onChange={e => setUserMobileNumber(e.target.value)}
            labelText="Mobile number"
            leftElement="+91"
            required
          />
          <Input
            name="email"
            type="email"
            className="inputElement"
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
            placeholder="Email"
            errMsg="Please enter a valid email"
            labelText="Email"
            required
          />
        </div>
      </div>
    </>
  )
}

export default ReceiverDetailsInput
