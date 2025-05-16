import { useTranslation } from "react-i18next"
import { useLocation } from "react-router"
import { supportedLanguages } from "~/localization/resource"
import { Link } from "../link"

const LanguageSwitcher = () => {
	const { i18n } = useTranslation()
	const location = useLocation()
	const to = location.pathname

	return (
		<div className="flex gap-2 p-2 fixed bottom-0 left-0 w-min z-10">
			{supportedLanguages.map((language) => (
				<Link
					className={"text-blue-500 dark:text-white transition-all"}
					style={{ fontWeight: i18n.language === language ? "bold" : "normal" }}
					key={language}
					to={`${to}?lng=${language}`}
					onClick={() => {
						i18n.changeLanguage(language)
					}}
				>
					{language}
				</Link>
			))}
		</div>
	)
}

export { LanguageSwitcher }
