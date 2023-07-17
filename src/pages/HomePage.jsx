import React from 'react'
import Header from '../components/Header'
import TimeEntryForm from '../components/TimeEntryForm'
const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>TimeSheet SMBXL</h1>
            <TimeEntryForm/>
            </div>
            </div>
            </div>
    </div>
  )
}

export default HomePage