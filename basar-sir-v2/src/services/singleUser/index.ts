"use server"

import { cookies } from "next/headers";

  export const GetMe = async () => {
    try {
      const token = (await cookies()).get("accessToken")?.value;
  
      if (!token) {
        throw new Error("Access token not found");
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/me/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":token,
        },
        next:{
        tags:['loginuser']
        }
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };
  
  export const PasswordChange = async (data: any) => {
    console.log("Sending Data:", data);
  
    try {
      const token = (await cookies()).get("accessToken")?.value;
      console.log("Token:", token);
  
      if (!token) {
        throw new Error("Access token not found");
      }
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
            Authorization: token,   
          },
          body:  JSON.stringify(data)
  , 
        }
      );
  
  
      return await response.json();
    } catch (error) {
      console.error("Error password change:", error);
      return null;
    }
  };
  

 
export const Updateuser = async (formData: FormData) => {
  console.log("Sending Data:", formData);

  try {
    const token = (await cookies()).get("accessToken")?.value;
    console.log("Token:", token);

    if (!token) {
      throw new Error("Access token not found");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/update`,
      {
        method: "PATCH",
        headers: {
          Authorization: token, 
        },
        body: formData, 
      }
    );

    // if (!response.ok) {
    //   throw new Error(`Failed to create project: ${response.statusText}`);
    // }

    return await response.json();
  } catch (error) {
    console.error("Error update user:", error);
    throw error;
  }
};