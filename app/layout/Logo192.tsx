import logo from "./logo192.png"

const Logo192 = () => {
	return <img src={logo} alt={"logo"} fetchPriority="high" rel="preload" />
}

export default Logo192
