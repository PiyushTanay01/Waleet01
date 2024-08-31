"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { updateProfile } from "../app/lib/actions/updateProfile";

export function UpdateProfile() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");  // State for displaying the success message

    const handleUpdate = async () => {
        const response = await updateProfile(name, password);
        setMessage(response.message);  // Set the response message
    };
    return <div className="h-[90vh]">
        <Center>
            <Card title="Update Profile">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Name"} label="Name" onChange={(value) => {
                        setName(value)
                    }} />
                    <TextInput placeholder={"Password"} label="Password" onChange={(value) => {
                        setPassword(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        {/* <Button onClick={async () => {
                            await updateProfile(name, password)
                        }}>Update</Button> */}
                        <Button onClick={handleUpdate}>Update</Button>
                    </div>
                    <div>
                    {message && (
                            <div className="pt-4 text-center">
                                <span className="text-green-600 font-semibold text-lg">
                                    {message}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}