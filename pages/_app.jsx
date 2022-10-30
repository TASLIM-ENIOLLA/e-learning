import '../public/css/globals.css'

export default ({Component, pageProps}) => {
    return (
        <>
            <Component className = "po-rel" style = {{zIndex: 0}} {...pageProps} />
            <div id="__popup"></div>
        </>
    )
}