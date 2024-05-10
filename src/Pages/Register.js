import { useState } from "react";
import { checkEmailValid, checkPassword } from "./Login.js"

export default function Register() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    //State for checking input errors
    const [ emailError, setEmailError ] = useState("");
    const [ passError, setPassError ] = useState("");

    //Function for validating form and checking for any input errorsconst validateForm = () => {
    const validateForm = () => {
        const email1 = checkEmailValid(email);
        const password1  = checkPassword(password);
  
        setEmailError(email1);
        setPassError(password1);

        let valid = true;

        if (email1) {
            valid = false;
        }
        if (password1){
            valid=false;
        }
        return (valid)
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
            .then((res) => res.json()
            .then((res) => console.log(res)))
            .catch((error) => console.log(error));
        };
    }
    //409: user already exists
    //400: bad request



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
                    </form>
                    <div className="flexBoxColumnGrow column-center">
                    <button className="login-button" onClick={register}>Register</button>
                    </div>
            </div>
        </div>
    )
                        }


export function checkName(name) {
    if (!name) {
        return "Name is required.";
    }
}