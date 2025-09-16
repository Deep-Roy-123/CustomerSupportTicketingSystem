import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateNewTicket from './Components/CreateNewTicket'
import TicketList from './Components/TicketList'
import TicketDetail from './Components/TicketDetail'

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<CreateNewTicket/>}/>
            <Route path='/dashboard' element={<TicketList/>}/>
            <Route path='/ticket/:id' element={<TicketDetail/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
