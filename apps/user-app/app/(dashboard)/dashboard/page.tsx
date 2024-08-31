import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

export default async function HomePage() {
    const session = await getServerSession(authOptions);
    const user = session?.user?.name || "User";
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id),
        },
    });
    const amount = balance?.amount / 100 || 0;

    return (
        <div className="flex items-center justify-center min-h-screen p-6 ml-72">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
                <h1 className="text-6xl font-bold text-purple-600">Hello {user},</h1>
                <p className="text-5xl font-black mt-8">Your Wallet Balance</p>
                <p className="text-4xl font-medium text-gray-700 mt-4">Rs {amount}</p>
            </div>
        </div>
    );
}

