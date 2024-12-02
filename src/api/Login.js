 
import React from "react";
import { useState } from "react";


function Login({ onLogin })
{

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeof onLogin === "function")
        {
            onLogin(username,password);
        }
        else
        {
            console.error("Error on login");
        }
    };

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={ handleSubmit}>
                <div>
                    <label>UserName</label>
                    <input type="text" value={username} 
                    onChange={(e)=> setUsername (e.target.value) } ></input> 
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" value={password} 
                    onChange={(e)=> setPassword (e.target.value) } ></input> 
                </div>
                <div>
                <button type="submit">Login</button>
                </div>
            </form>
         </div>
    )

}

export default Login;