import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export function Signin () {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <div className="bg-slate-900 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign in"}></Heading>
                <Subheading label={"Enter you credentials to access your account"}></Subheading>
                <InputBox 
                    placeholder="mamoon@gmail.com" 
                    label={"Email"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                ></InputBox>
                <InputBox 
                    placeholder="123456" 
                    label={"Password"}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    >
                </InputBox>
                <div className="pt-4">
                    <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            username: username,
                            password: password
                        });
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard");
                    }} label={"Sign in"} />
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}