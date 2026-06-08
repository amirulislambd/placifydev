'use server'

import { serverFetch } from "../core/serverMutation"

export const getApplicationsByaApplicant=async(applicantId)=>{
    return serverFetch(`applications?applicantId=${applicantId}`)
}