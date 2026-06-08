import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICES_ID = {
    'seeker_pro':'price_1Tg9PxPk4rNbr2rsonW8HvJo',
    'seeker_premium':'price_1Tg9SnPk4rNbr2rsuCs9IWAH',
    'recruiter_growth':'price_1Tg9OXPk4rNbr2rsz0jS1jZ8',
    'recruiter_enterprise':'price_1Tg9MsPk4rNbr2rswfX7APaA',
}