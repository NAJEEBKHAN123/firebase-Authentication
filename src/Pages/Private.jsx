import { signOut } from "firebase/auth"
import { auth } from "../firebase"


function Private() {

  const handleSignOut = () =>{
    signOut(auth)
    .then(()=>alert("signOut Successfully"))
    .catch(error =>{
      console.log(error)
      alert(error.message)
    })
  }
  
  return (
    <div>
    <header>

    </header>
    <main>
      <h1>Your Profile</h1>
      <p>Welcome to the Private Dashboard</p>
    </main>
    <footer>
      <button onClick={handleSignOut} className="btn btn-danger">SignOut</button>
    </footer>
    </div>
  )
}

export default Private
