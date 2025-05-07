import { z } from "zod"

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	APP_ENV: z.enum(["development", "staging", "production"]).default("development"),
})

type ServerEnv = z.infer<typeof envSchema>
let env: ServerEnv

/*
 * Helper method used for initializing .env vars in your entry.server.ts file. It uses
 * zod to validate your .env and throws if it's not valid.
 * @returns Initialized env vars
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function initEnv(cfEnv: any) {
	const envData = envSchema.safeParse(cfEnv)

	if (!envData.success) {
		// biome-ignore lint/suspicious/noConsole: We want this to be logged
		console.error("❌ Invalid environment variables:", envData.error.flatten().fieldErrors)
		throw new Error("Invalid environment variables")
	}

	env = envData.data
	Object.freeze(env)

	// Do not log the message when running tests
	if (env.NODE_ENV !== "test") {
		// biome-ignore lint/suspicious/noConsole: We want this to be logged
		console.log("✅ Environment variables loaded successfully")
	}
	return env
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function getServerEnv(cfEnv: any) {
	if (env) return env
	return initEnv(cfEnv)
}

/**
 * Helper method for you to return client facing .env vars, only return vars that are needed on the client.
 * Otherwise you would expose your server vars to the client if you returned them from here as this is
 * directly sent in the root to the client and set on the window.env
 * @returns Subset of the whole process.env to be passed to the client and used there
 */
export const getClientEnv = () => {
	const serverEnv = env
	return {
		NODE_ENV: serverEnv.NODE_ENV,
	}
}

type CLIENT_ENV = ReturnType<typeof getClientEnv>

declare global {
	interface Window {
		env: CLIENT_ENV
	}
}
