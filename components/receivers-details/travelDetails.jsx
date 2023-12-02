import React, { useEffect } from 'react'
import { Input } from '@acko-tech/building-blocks.ui.input'
import { Dropdown } from '@acko-tech/building-blocks.ui.dropdown'
import { ThemeProvider, AckoMainTheme } from '@acko-tech/building-blocks.ui.theme'
import styles from '@/styles/gift-section/receiverDetails.module.css'

const TravelINsuranceDetail = ({
  questions,
  onInsuranceDetailsFilled,
  onTravelDetailsFilled,
  travelType,
  setTravelType,
  numberOfMembers,
  setNumberOfMembers,
  modeOfTravel,
  setModeOfTravel,
  theftCoverage,
  setTheftCoverage,
  whatInsurance,
  vehicleAge,
  ownerAge,
  pincode,
}) => {
  useEffect(() => {
    const isInsuranceDetailsValid = whatInsurance && vehicleAge && ownerAge && pincode
    onInsuranceDetailsFilled(isInsuranceDetailsValid)
  }, [whatInsurance, vehicleAge, ownerAge, pincode, onInsuranceDetailsFilled])

  useEffect(() => {
    const isTravelDetailsValid = travelType && numberOfMembers && modeOfTravel && theftCoverage
    onTravelDetailsFilled(isTravelDetailsValid)
  }, [travelType, numberOfMembers, modeOfTravel, theftCoverage, onTravelDetailsFilled])

  return (
    <div className={styles.receiversDetails}>
      <div className={styles.box}>
        <h1>Enter Travel Details</h1>
        <ThemeProvider theme={AckoMainTheme}>
          <Dropdown
            label={questions.lobs[1].questions[0].question}
            value={travelType}
            onChange={setTravelType}
            options={questions.lobs[1].questions[0].options.map(option => ({
              displayValue: option,
              value: option,
            }))}
          />
          <Input
            name={questions.lobs[1].questions[1].question}
            type="number"
            className="inputElement"
            value={numberOfMembers}
            onChange={e => setNumberOfMembers(e.target.value)}
            labelText={questions.lobs[1].questions[1].question}
          />
          <Dropdown
            label={questions.lobs[1].questions[2].question}
            value={modeOfTravel}
            onChange={setModeOfTravel}
            options={questions.lobs[1].questions[2].options.map(option => ({
              displayValue: option,
              value: option,
            }))}
          />
          <Input
            name={questions.lobs[1].questions[3].question}
            type="number"
            className={theftCoverage}
            value={theftCoverage}
            onChange={e => setTheftCoverage(e.target.value)}
            labelText={questions.lobs[1].questions[3].question}
          />
        </ThemeProvider>
      </div>
    </div>
  )
}

export default TravelINsuranceDetail
