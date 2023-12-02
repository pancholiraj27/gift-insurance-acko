import React, { useEffect, useState } from 'react'
import InsuranceDetailsInput from '@/components/receivers-details/insuranceDetails'
import TravelDetailsFile from '@/components/receivers-details/travelDetails'
import styles from '@/styles/gift-section/receiverDetails.module.css'
import { ThemeProvider, AckoMainTheme } from '@acko-tech/building-blocks.ui.theme'
import { Dropdown } from '@acko-tech/building-blocks.ui.dropdown'

const LobChecker = ({ questions, onInsuranceDetailsFilled }) => {
  const [lobOptions, setLobOptions] = useState([])
  const [selectedInsuranceType, setSelectedInsuranceType] = useState('')
  const [whatInsurance, setWhatInsurance] = useState({ displayValue: '', value: '' })

  useEffect(() => {
    if (questions && questions.lobs) {
      const uniqueLobOptions = Array.from(new Set(questions.lobs.map(item => item.lob)))
      setLobOptions(uniqueLobOptions)
    }
  }, [questions])

  console.log(whatInsurance.displayValue)

  return (
    <ThemeProvider theme={AckoMainTheme}>
      <div className={styles.receiversDetails}>
        <div className={styles.box}>
          <h1>Enter Receiver details</h1>
          <Dropdown
            label="What is the type of insurance ?"
            value={whatInsurance}
            onChange={setWhatInsurance}
            options={lobOptions.map(lob => ({ displayValue: lob, value: lob }))}
          />
          {whatInsurance.displayValue === 'auto' && (
            <InsuranceDetailsInput questions={questions} onInsuranceDetailsFilled={onInsuranceDetailsFilled} />
          )}

          {whatInsurance.displayValue === 'travel' && (
            <TravelDetailsFile questions={questions} onInsuranceDetailsFilled={onInsuranceDetailsFilled} />
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default LobChecker
