import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");

    //State for checking input errors
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");

    const [res, setRes] = useState(null);

    //Function for validating form and checking for any input errors
    const validateForm = () => {
        const password1 = checkPassword(password);
        const email1 = checkEmailValid(email);

        setEmailError(email1);
        setPassError(password1);

        let valid = true;

        if (email1) {
            valid = false;
        }
        if (password1) {
            valid = false;
        }
        return (valid)
    }

    //Function for logging in
    const login = (e) => {
        e.preventDefault();
        const form = document.getElementById("login");
        const formData = new FormData(form);
        const valid = validateForm(formData);

        if (valid) {
            fetch("http://4.237.58.241:3000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
            })
                .then((res) => {
                    if (res.status === 401) {
                        setErrorResponse("Incorrect email or password. Please try again.")
                    } else if (!res.ok) {
                        throw new Error("Something went wrong."),
                        setErrorResponse("Something went wrong. Please try again later.")
                    } else {
                        return res.json()
                    }
                })
                .then((res) => {
                    localStorage.setItem("token", res.token);

                    navigate("/");
                    window.location.reload(false);
                    console.log(res);

                })
                .catch((error) => {
                    console.log(error);
                });
        };
    }

    return (
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
                {res
                    && (
                        <div className="error-message" style={{ paddingBottom: "10px" }}>
                            {res.message}
                        </div>
                    )}
                {errorResponse
                    && (
                        <div className="error-message" style={{ paddingBottom: "10px" }}>
                            {errorResponse}
                        </div>
                    )}
                <div className="flexBoxColumnGrow column-center">
                    <button className="login-form-button" onClick={login}>Login</button>
                    <p style={{marginTop:"20px"}}>Not yet registered? Click&nbsp;
                        <Link className="error-home-button" to="/register">
                            here
                        </Link> to register!
                    </p>
                </div>
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