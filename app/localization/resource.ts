import bosnian from "../../resources/locales/bs/common.json"
import english from "../../resources/locales/en/common.json"
import dutch from "../../resources/locales/nl/common.json"

const languages = ["en", "bs", "nl"] as const
export const supportedLanguages = [...languages]
export type Language = (typeof languages)[number]

type Resource = {
	common: typeof english
}

export type Namespace = keyof Resource

export const resources: Record<Language, Resource> = {
	en: {
		common: english,
	},
	bs: {
		common: bosnian,
	},
	nl: {
		common: dutch,
	},
}
