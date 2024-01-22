import React from 'react';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';

const BASEURL = "http://localhost:5050/api/v1/";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await fetch(`${BASEURL}adminAuth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
            )
            const data = await response.json()
            if (response.ok) {
                navigate("/sideBar")
            }
            else {
                throw new Error(data.message || "Registration failed");
            }
        } catch (error) {
            alert("Password or email is wrong")
        }
    }
    return (
        <div className="login-container">
            <h2 className='signTitle'>Admin Login</h2>
            <div>
                <div className="form-group">
                    <label className='FormLabels'  >Email:</label>
                    <input className='LoginInput'
                        type="email"
                        id="email"
                        placeholder="Enter Email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className='FormLabels'>Password:</label>
                    <input className='LoginInput'
                        type="password"
                        id="password"
                        placeholder="Enter Password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="Keep me logged in"
                    />
                </div>
                <div className="form-group">
                    <Button onClick={handleLogin} style={{ marginTop: 20, width: 434, height: 50, borderRadius: 10 }} variant="contained">SIGN IN</Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
