import React, { useState, useEffect } from 'react'
import { Input } from '@acko-tech/building-blocks.ui.input'
import { Dropdown } from '@acko-tech/building-blocks.ui.dropdown'
import { ThemeProvider, AckoMainTheme } from '@acko-tech/building-blocks.ui.theme'
import styles from '@/styles/gift-section/receiverDetails.module.css'

const InsuranceDetailsInput = ({
  questions,
  onInsuranceDetailsFilled,
  whatInsurance,
  setWhatInsurance,
  vehicleAge,
  setVehicleAge,
  ownerAge,
  setOwnerAge,
  pincode,
  setPincode,
}) => {
  useEffect(() => {
    const isInsuranceDetailsValid = whatInsurance && vehicleAge && ownerAge && pincode
    onInsuranceDetailsFilled(isInsuranceDetailsValid)
  }, [whatInsurance, vehicleAge, ownerAge, pincode, onInsuranceDetailsFilled])

  return (
    <div className={styles.receiversDetails}>
      <div className={styles.box}>
        <h1>Enter Receiver's Car Details</h1>
        <ThemeProvider theme={AckoMainTheme}>
          <Dropdown
            label={questions.lobs[0].questions[0].question}
            value={'whatInsurance'}
            onChange={setWhatInsurance}
            options={questions.lobs[0].questions[0].options.map(option => ({
              displayValue: option,
              value: option,
            }))}
          />
          <Dropdown
            label={questions.lobs[0].questions[1].question}
            value={'vehicleAge'}
            onChange={setVehicleAge}
            options={questions.lobs[0].questions[1].rangeOptions.map(option => ({
              displayValue: `${option.min} - ${option.max}`,
              value: `${option.min}-${option.max}`,
            }))}
          />
          <Dropdown
            label={questions.lobs[0].questions[2].question}
            value={'ownerAge'}
            onChange={setOwnerAge}
            options={questions.lobs[0].questions[2].rangeOptions.map(option => ({
              displayValue: `${option.min} - ${option.max} years`,
              value: `${option.min}-${option.max}`,
            }))}
          />
          <Input
            name={questions.lobs[0].questions[3].question}
            type="number"
            className="inputElement"
            value={pincode}
            onChange={e => setPincode(e.target.value)}
            labelText={questions.lobs[0].questions[3].question}
          />
        </ThemeProvider>
      </div>
    </div>
  )
}

export default InsuranceDetailsInput
