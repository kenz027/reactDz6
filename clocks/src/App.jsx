import { useState } from "react"
import Clocks from "./components/Clocks/Clocks";
import Form from "./components/Form/Form"
import './css/App.css'

function App() {
  const [clocksData, setClocksData] = useState([]);
  async function formSubmitHandler({nameValue, timeZoneValue}){
    await nameValue, timeZoneValue
    setClocksData((prev)=>[...prev, {name: nameValue, timeZone: timeZoneValue, id: self.crypto.randomUUID()}]);
  }
  return (
    <div className="App">
      <Form onFormSubmit={formSubmitHandler} />
      <Clocks clocksDataList={clocksData} />
    </div>
  )
}

export default App
