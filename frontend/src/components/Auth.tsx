import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { signupInput } from "@ryuk01/medium-common";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({type}: {type:"signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<signupInput>({
        username: "",
        password: "",
        name: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == "signup"? "signup" : "signin"}`, {
                email: postInputs.username, 
                name: postInputs.name,
                password: postInputs.password
            });
            const jwt = response.data.jwt;
            console.log("JWT Token:", jwt);
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            console.error("Error during authentication:");
        }
    }

    return (
        <div className="bg-slate-200 min-h-screen flex justify-center flex-col px-20">
            <div className="text-5xl font-extrabold pb-4 flex justify-center">
                {type === "signup" ? "Create an Account" : "Welcome Back"}
            </div>
            <div className="text-2xl font-normal text-slate-500 pb-10 flex justify-center">
                {type === "signup" ? "Already have an account?" : "Don't Have an Account?"}
                <Link className="pl-2 underline" to={type === "signup" ? "/signin" : "/signup"}>
                    {type === "signup" ? "Login" : "Sign up"}
                </Link>
            </div>

            <div className="flex justify-center flex-col px-28">
                {type === "signup" ? (
                    <LabelledInput
                        label="Username"
                        placeholder="Enter your Username..."
                        onChange={(e) => setPostInputs({ ...postInputs, name: e.target.value })}
                    />
                ) : null}

                <LabelledInput
                    label="Email"
                    placeholder="Enter Your Email..."
                    onChange={(e) => setPostInputs({ ...postInputs, username: e.target.value })}
                />
                <LabelledInput
                    label="Password"
                    type="password"
                    placeholder="Enter Your Password..."
                    onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
                />
                <button
                    onClick={sendRequest}
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-3 mt-10 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                    {type === "signup" ? "Sign up" : "Login"}
                </button>
            </div>
        </div>
    );
};

interface LabelInputTypes {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelInputTypes) {
    return (
        <div className="pb-5">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-grey">{label}</label>
            <input
                onChange={onChange}
                type={type}
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full px-8 py-3"
                placeholder={placeholder}
            />
        </div>
    );
}



