'use server'

import { headers } from "next/headers"
import { auth } from "../auth"
import { revalidatePath } from "next/cache"  

export const UpdateUserRole = async (userId, role) => {
  const data = await auth.api.setRole({
    body: { userId, role },
    headers: await headers()
  })
  revalidatePath("/dashboard/admin/users")  
  return data
}

export const updateUserStatus = async (userId, status) => {
  if (status === "suspended") {
    const data = await auth.api.banUser({
      body: { userId },
      headers: await headers()
    })
    revalidatePath("/dashboard/admin/users") 
    return data
  } else {
    const data = await auth.api.unbanUser({
      body: { userId },
      headers: await headers()
    })
    revalidatePath("/dashboard/admin/users")  
    return data
  }
}

export const deleteUser = async (userId) => {
  const data = await auth.api.removeUser({
    body: { userId },
    headers: await headers()
  })
  revalidatePath("/dashboard/admin/users") 
  return data
}