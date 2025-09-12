"use server"


import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const GetAllBlog = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next:{
      tags:["blogs"]
      }
    });

 

    return await response.json();
  } catch (error) {
    console.error("Error fblog get:", error);
    return null;
  }
};

export const SingleBlog = async (id:string) => {
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
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




export const createPost = async (formData: FormData) => {
  console.log("Sending Data:", formData);

  try {
    const token = (await cookies()).get("accessToken")?.value;
    console.log("Token:", token);

    if (!token) {
      throw new Error("Access token not found");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog/create`,
      {
        method: "POST",
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
    console.error("Error creating blog:", error);
    throw error;
  }
};


  export const DeleteBlog = async (id:string) => {
  console.log(id)
    try {
      const cookieStore = await cookies();
      let token = cookieStore.get("accessToken")!.value;
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization":token,
        },
      });
      revalidateTag("blogs");
      return await response.json();
    } catch (error) {
      console.error("Error delete memeber:", error);
      return null;
    }
  };