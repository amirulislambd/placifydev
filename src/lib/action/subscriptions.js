'use server'

import { serverMutation } from "../core/serverMutation"

export const createSubscription = async(subsInfo)=>{
    return serverMutation('subscriptions',subsInfo)
}