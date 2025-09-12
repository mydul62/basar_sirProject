"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const GetAllActivities = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/activity/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next:{
      tags:["publications"]
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






export const CreateActivities = async (data: any) => {
  console.log("Sending Data:", data);

  try {
    const token = (await cookies()).get("accessToken")?.value;
    console.log("Token:", token);

    if (!token) {
      throw new Error("Access token not found");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/activity/create`,
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
    console.error("Error blog post:", error);
    return null;
  }
};


  export const DeleteActivities  = async (id:string) => {
    try {
      const cookieStore = await cookies();
      let token = cookieStore.get("accessToken")!.value;
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/activity/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization":token,
        },
      });
      revalidateTag("publications");
      return await response.json();
    } catch (error) {
      console.error("Error delete memeber:", error);
      return null;
    }
  };