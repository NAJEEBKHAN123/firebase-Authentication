import Home from "./Pages/Home"
import Private from "./Pages/Private"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './Component/ProtectedRoute'
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"


function App() {

  const [user, setUser] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (user) =>{
      if(user){
        setUser(user)
        setIsFetching(false)
        return
      }
      setUser(null)
      setIsFetching(false)
    })
    return () =>unsubscribe()

  }, []);

  if(isFetching){
    return <h2>Loading....</h2>
  }
  return (
    <BrowserRouter>
    <Routes>
      <Route  path='/' element = {<Home/>}/>
      <Route  path='/private' element={
        <ProtectedRoute user={user}>
          <Private/>
        </ProtectedRoute>
      }/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
