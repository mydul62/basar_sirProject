"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const GetAllAward= async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/award/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next:{
      tags:["award"]
      }
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fblog get:", error);
    return null;
  }
};





export const CreateAward = async (data: any) => {
  console.log("Sending Data:", data);

  try {
    const token = (await cookies()).get("accessToken")?.value;
    console.log("Token:", token);

    if (!token) {
      throw new Error("Access token not found");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/award/create`,
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

  revalidateTag("award");
    return await response.json();
  } catch (error) {
    console.error("Error blog post:", error);
    return null;
  }
};


  export const DeleteAward = async (id:string) => {
  console.log(id)
    try {
      const cookieStore = await cookies();
      let token = cookieStore.get("accessToken")!.value;
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/award/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization":token,
        },
      });
      revalidateTag("award");
      return await response.json();
    } catch (error) {
      console.error("Error delete memeber:", error);
      return null;
    }
  };