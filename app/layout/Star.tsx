import star from "./star.png"

const Star = () => {
	return <img src={star} alt={"logo"} fetchPriority="high" rel="preload" />
}

export default Star
