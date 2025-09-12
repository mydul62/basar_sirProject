"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const GetAllGrants= async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/grant/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next:{
      tags:["grant"]
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


export const SingleGrants= async (id:string) => {
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/grant/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    console.log(response)

    return await response.json();
  } catch (error) {
    console.error("Error single blog get:", error);
    return null;
  }
};


export const updateGrants = async (id:string,data: any) => {

  try {
    const token = (await cookies()).get("accessToken")?.value;
  
    if (!token) {
      throw new Error("Access token not found");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/grant/${id}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", 
          Authorization: token,   
        },
        body:  JSON.stringify(data)
, 
      }
    );

  revalidateTag("grant");
    return await response.json();
  } catch (error) {
    console.error("Error blog post:", error);
    return null;
  }
};


  export const DeleteGrants = async (id:string) => {
  console.log(id)
    try {
      const cookieStore = await cookies();
      let token = cookieStore.get("accessToken")!.value;
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/grant/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization":token,
        },
      });
      revalidateTag("grant");
      return await response.json();
    } catch (error) {
      console.error("Error delete memeber:", error);
      return null;
    }
  };