'use server'

import { serverMutation } from "../core/serverMutation"

export const createCompany = async (newCompanyData)=>{
return serverMutation('companies',newCompanyData)
}