import { useState } from "react";
import { checkEmailValid, checkPassword } from "./Login.js"

export default function Register() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ cpassword, setCPassword ] = useState("");
    const [ errorResponse, setErrorResponse ] = useState("");

    //State for checking input errors
    const [ emailError, setEmailError ] = useState("");
    const [ passError, setPassError ] = useState("");
    const [cPassError, setCPassError ] = useState("");

    const [res, setRes] = useState(null);

    //Function for validating form and checking for any input errorsconst validateForm = () => {
    const validateForm = () => {
        const email1 = checkEmailValid(email);
        const password1  = checkPassword(password);
        const cpassword1 = comparePass(password, cpassword);
  
        setEmailError(email1);
        setPassError(password1);
        setCPassError(cpassword1);
        setRes("");
        setErrorResponse("");

        let valid = true;

        if (email1) {
            valid = false;
        }
        if (password1){
            valid=false;
        }
        if(cpassword1){
            valid=false;
        }
        return (valid)
    }

    function clearField(){
        setEmail("");
        setPassword("");
        setCPassword("");
        setErrorResponse("");
    }

       //Function for registering
       const register = (e) => {
        const form = document.getElementById("register");
        const formData = new FormData(form);
        const valid = validateForm(formData);

        if (valid) {
            fetch("http://4.237.58.241:3000/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({ email: email, password: password }),
            })
            .then((res) => {
                if(res.status === 409){
                    setErrorResponse("User already exists.");
                    setRes("");
                } else if (!res.ok) {
                    throw new Error("Something went wrong."),
                    setErrorResponse("Something went wrong. Please try again later.")
                } else {
                return res.json()
                }
            })
            .then((res) => {
                if(res.Success == true){
                    console.log(res);
                    clearField();
                } else {
                    console.log(res);
                    setRes(res);
                    clearField();
                }
            }
            )
            .catch((error) => console.log(error));
        };
    }

    return(
        <div className="flexBoxColumnGrow background register-page column-center">
            <h1 className="greeting-colour">Register</h1>
            <div>
                <form id="register" className="flexBoxColumnGrow column-center">
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                    />
                    <p className="error-message">{emailError}</p>
                    <label htmlFor="password">Password</label>
                     <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                    />
                    <p className="error-message">{passError}</p>
                    <label htmlFor="cpassword">Confirm Password</label>
                     <input 
                        id="cpassword" 
                        name="cpassword" 
                        type="password" 
                        value={cpassword}
                        onChange={(event) => {
                            setCPassword(event.target.value);
                          }}
                    />
                    <p className="error-message">{cPassError}</p>
                    </form>
                    <div className="flexBoxColumnGrow column-center">
                        {res
                            && (
                                <div className="error-message" style={{paddingBottom:"10px"}}>
                                
                                    <p>{res.message}. Please login.</p>
                                </div>
                            )}
                        {errorResponse
                            && (
                                <div className="error-message" style={{paddingBottom:"10px"}}>
                                    {errorResponse}
                                </div>
                            )}
                    </div>
                    <div className="flexBoxColumnGrow column-center">
                        <button className="login-button" onClick={register}>Register</button>
                    
                    </div>
            </div>
        </div>
    )
    }

    function comparePass(pass1, pass2) {

        if (pass1 !== pass2) {
            return ("Passwords do not match.");
        }
    }
