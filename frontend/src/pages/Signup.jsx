import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export function Signup () {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-900 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"}></Heading>
                <Subheading label={"Enter your Information to create an account"}></Subheading>
                <InputBox onChange={e => {
                    setFirstName(e.target.value);
                }} placeholder="nick" label={"First Name"}></InputBox>
                <InputBox onChange={e => {
                    setLastName(e.target.value);
                }} placeholder="doe" label={"Last Name"}></InputBox>
                <InputBox onChange={e => {
                    setUsername(e.target.value);
                }} placeholder="mamoon@gmail.com" label={"Email"}></InputBox>
                <InputBox onChange={e => {
                    setPassword(e.target.value);
                }} placeholder="123456" label={"Password"}></InputBox>
                <div className="pt-4">
                    <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            username: username,
                            firstName: firstName,
                            lastName: lastName,
                            password: password
                        });
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard");
                    }} label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}