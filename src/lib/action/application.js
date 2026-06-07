'use server'

import { serverMutation } from "../core/serverMutation";

export const submitApplication = async (applicationData) => {
    return serverMutation("applications", applicationData);
    
}