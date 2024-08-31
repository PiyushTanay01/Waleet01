"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";

export async function updateProfile(name?: string, password?: string) {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    if (!userId) {
        return {
            message: "User not logged in",
        };
    }

    const updateData: { name?: string; password?: string } = {};

    if (name) {
        updateData.name = name;
    }

    if (password) {
        console.log("Original password:", password);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedPassword);
        updateData.password = hashedPassword;
    }
    

    if (Object.keys(updateData).length === 0) {
        return {
            message: "No updates provided",
        };
    }

    await prisma.user.update({
        where: {
            id: userId,
        },
        data: updateData,
    });

    return {
        message: "Profile Updated Successfully!",
    };
}
