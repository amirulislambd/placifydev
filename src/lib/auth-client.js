import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
          defaultValue: "seeker",
          input: true,
        },
        plan: {
          type: "string",
          defaultValue: "seeker_free",
          input: true,
        },
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;

