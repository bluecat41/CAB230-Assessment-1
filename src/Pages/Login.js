import { useState } from "react";

export default function Login() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    //State for checking input errors
    const [ emailError, setEmailError ] = useState("");
    const [ passError, setPassError ] = useState("");

    //Function for validating form and checking for any input errors
    const validateForm = () => {
        const password1  = checkPassword(password);
        const email1 = checkEmailValid(email);

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

    //Function for logging in
    const login = () => {
        const form = document.getElementById("login");
        const formData = new FormData(form);
        const valid = validateForm(formData);
    }

    return(
        <div className="flexBoxColumnGrow background login-page column-center">
            <h1 className="greeting-colour">Login</h1>
            <div>
                <form id="login" className="flexBoxColumnGrow column-center">
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
                    <button className="login-button" onClick={login}>Login</button>
                    </div>
            </div>
        </div>
    )
}

export function FormInput(props) {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <div>
                <input
                    type={props.type}
                    name={props.name}
                    className={props.class}
                    label={props.label}
                    defaultValue={props.value}
                />
                <p className="error-message">{props.error}</p>
            </div>
        </div>
    )
}

//Validation Functions
export function checkEmailValid(email) {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkValid = new RegExp(regEx);

    if (email == "") {
        return "Email address is required.";
    } else if (!checkValid.exec(email)) {
        return "Please check the email format.";
    }
}

export function checkPassword(password) {
    if (!password) {
        return "Password is required.";
    }
}