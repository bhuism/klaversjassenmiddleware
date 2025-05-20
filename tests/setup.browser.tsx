import { renderHook as renderReactHook } from "@testing-library/react"
import { Outlet, type RoutesTestStubProps, createRoutesStub } from "react-router"
import { render } from "vitest-browser-react"
import "../app/tailwind.css"

type StubRouteEntry = Parameters<typeof createRoutesStub>[0][0]

const renderStub = async (args?: {
	props?: RoutesTestStubProps
	entries?: StubRouteEntry[]
}) => {
	// Initialize the i18next instance

	// We create the entries array to be rendered by react-router
	const entries: StubRouteEntry[] = [
		{
			id: "root",
			path: "/",
			children: args?.entries ?? [],
			Component: () => (
				<div data-testid="root">
					<Outlet />
				</div>
			),
		},
	]
	// We generate the props to be passed into the react-router stub
	const props: RoutesTestStubProps = {
		...args?.props,
		initialEntries: args?.props?.initialEntries ?? ["/"],
	}
	// We generate the stub using the entries and props
	const Stub = createRoutesStub(entries)
	// We render the container so it can be used in tests
	const renderedScreen = render(<Stub {...props} />)

	return renderedScreen
}

const renderHook = renderReactHook

// We extend the global test context with our custom functions that we pass into the context in beforeEach
declare module "vitest" {
	export interface TestContext {
		renderStub: typeof renderStub
		renderHook: typeof renderHook
	}
}
// We pass in our custom functions to the test context
beforeEach((ctx) => {
	ctx.renderStub = renderStub
	ctx.renderHook = renderHook
})

// We clear all mocks after each test (optional, feel free to remove it)
afterEach(() => {
	vi.clearAllMocks()
})
