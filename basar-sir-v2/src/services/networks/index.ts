"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const GetAllNetworks= async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/network/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next:{
      tags:["network"]
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

export const SingleNetwork= async (id:string) => {
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/network/${id}`, {
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



export const CreateNetworks = async (data: any) => {
  console.log("Sending Data:", data);

  try {
    const token = (await cookies()).get("accessToken")?.value;
    console.log("Token:", token);

    if (!token) {
      throw new Error("Access token not found");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/network/create`,
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
export const updateNetworks = async (id:string,data: any) => {

  try {
    const token = (await cookies()).get("accessToken")?.value;
  
    if (!token) {
      throw new Error("Access token not found");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/network/${id}/update`,
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

  revalidateTag("award");
    return await response.json();
  } catch (error) {
    console.error("Error blog post:", error);
    return null;
  }
};

  export const DeleteNetworks = async (id:string) => {
  console.log(id)
    try {
      const cookieStore = await cookies();
      let token = cookieStore.get("accessToken")!.value;
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/network/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization":token,
        },
      });
      revalidateTag("network");
      return await response.json();
    } catch (error) {
      console.error("Error delete memeber:", error);
      return null;
    }
  };