import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [login, setLogin] = useState(false);
    const navigate=useNavigate();

    const endpoint = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    async function handleCreateAccount() {
        console.log("Creating account...");

        try {
            const response = await axios.post(`${endpoint}/createaccount`, {
                name,
                email,
                phone,
                password
            });

            alert(response.data.response); 
            
            setLogin(true); 
        } catch (error:any) {
            alert("Error creating account: " + (error.response?.data?.message || error.message)+" " +error.response.data.response);
        }
    }

    async function handleLogin() {
        console.log("Logging in...");

        try {
            const response = await axios.post(`${endpoint}/login`, { email, password });

            if (response.data) {
                localStorage.setItem("token", response.data.data);
                alert("Login Successful!");
                navigate('/dashboard')

            } 
        } catch (error:any) {
            alert("Login failed: " + (error.response?.data?.message || error.message)+" " +error.response.data.response);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {!login && (
                <div className="create-account bg-white p-6 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Create Admin Account</h2>

                    <div className="forum">
                        <input onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="input-field" />
                        <input onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" className="input-field" />
                        <input onChange={(e) => setPhone(e.target.value)} placeholder="Enter your Phone" className="input-field" />
                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" className="input-field" />

                        <button onClick={handleCreateAccount} className="bg-blue-500 text-white px-4 py-2 mt-4 w-full">Create Account</button>
                    </div>

                    <span className="text-blue-500 cursor-pointer mt-3" onClick={() => setLogin(true)}>Already have an account? Click here</span>
                </div>
            )}

            {login && (
                <div className="login bg-white p-6 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

                    <div className="forum">
                        <input onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" className="input-field" />
                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" className="input-field" />

                        <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 mt-4 w-full">Login</button>
                    </div>

                    <span className="text-blue-500 cursor-pointer mt-3" onClick={() => setLogin(false)}>No account? Click here</span>
                </div>
            )}


            <button onClick={()=>{navigate('/')}}>Get Code</button>
        </div>
    );
}
