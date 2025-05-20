import { Link, href, useNavigate } from "react-router"

export default function Route404() {
	const navigate = useNavigate()
	const to = href("/")
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-blue-950 dark:to-blue-900 dark:text-white flex items-center justify-center p-4">
			<div className="max-w-2xl w-full text-center">
				<div className="mb-8 flex justify-center">
					<img src="/ghost.svg" className="h-24 w-24 text-indigo-600 animate-float" alt="ghost" />
				</div>

				<h1 className="text-6xl font-bold dark:text-white text-gray-900 mb-4">404</h1>
				<h2 className="text-3xl font-semibold dark:text-white text-gray-800 mb-4">Not Found</h2>
				<p className="text-gray-600 dark:text-white mb-8 text-lg">There is no spoon</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<button
						type="button"
						onClick={() => navigate(-1)}
						className="inline-flex cursor-pointer items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors duration-300"
					>
						Back
					</button>
					<Link
						to={to}
						className="inline-flex cursor-pointer items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
					>
						Home
					</Link>
				</div>
			</div>
		</div>
	)
}
