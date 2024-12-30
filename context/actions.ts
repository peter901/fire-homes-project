"use server"

import { auth } from "@/firebase/server";
import { cookies } from "next/headers";

export const removeToken = async() =>{
    const cockieStore = await cookies();
    cockieStore.delete("firebaseAuthToken");
    cockieStore.delete("firebaseAuthRefreshToken");
}

export const setToken = async ({
    token,
    refreshToken
}: {
    token : string;
    refreshToken: string;
}) =>{
    try{
        const verifiedToken = await auth.verifyIdToken(token);

        if(!verifiedToken){
            return ;
        }

        const userRecord = await auth.getUser(verifiedToken.uid);

        if(process.env.ADMIN_EMAIL === userRecord.email && !userRecord.customClaims?.admin){
            auth.setCustomUserClaims(verifiedToken.uid, {
                admin: true
            });
        }

        const cookieStore = await cookies();

        cookieStore.set("firebaseAuthToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        })

        cookieStore.set("firebaseAuthRefreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        })
    }catch(e){
        console.error(e);
    }
}