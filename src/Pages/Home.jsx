import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Home() {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const [isSignUpActive, setisSignUpActive] = useState(true)
    const [error, seterror] = useState("")

   const navigate = useNavigate();

    function handleEmailChange(e) {
        setemail(e.target.value)
       
    }

    function handlePasswordChange(e) {
        setpassword(e.target.value)
    }

    function handleSignIn() {
        if (!email || !password) {
            seterror('Email and password both are required')
            return
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log(user)
                navigate('/private')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                seterror(errorMessage)
                console.log({ errorCode, errorMessage })
            })
    }

    function handleSignUp(e) {
        e.preventDefault();
        if (!email || !password) {
            seterror('Email and password both are required')
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log(user)
                
                
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                seterror(errorMessage)
                console.log({ errorCode, errorMessage })
            })
    }
    function handleMethodChange() {
        setisSignUpActive(!isSignUpActive)
    }

    return (
        <form>
            {isSignUpActive && <legend className="h2">Sign Up</legend>}
            {!isSignUpActive && <legend className="h2">Sign In</legend>}
            <fieldset>
                <ul>
                    <li>
                        {/* <label htmlFor="email">Email</label> */}
                        <input type="email" id="email" onChange={handleEmailChange} placeholder="Enter your Email"/>
                    </li>
                    <li>
                        {/* <label htmlFor="password">Password</label> */}
                        <input type="password" id="password" onChange={handlePasswordChange} placeholder="Enter Your Password" />
                    </li>
                </ul>
                {error && <p id="error-message">{error}</p>}
                {isSignUpActive && (
                    <button type="button" onClick={handleSignUp}  className="btn btn-primary">SIGN UP</button>
                )}
                {!isSignUpActive && (
                    <button type="button" onClick={handleSignIn} className="btn btn-primary">SIGN IN</button>
                )}
            </fieldset>
            <div className="SignInUp">
            {isSignUpActive && <a onClick={handleMethodChange}>Already have an account? Sign In</a>}
            {!isSignUpActive && <a onClick={handleMethodChange}>Do not have an account? Sign Up</a>}
            </div>

        </form>

    )
}

export default Home
