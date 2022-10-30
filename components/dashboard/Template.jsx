import {useState, useRef, useEffect} from 'react'
import {useRouter} from 'next/router'

import {URL} from '/data/URL'

export default ({children}) => {
    const {asPath, ...rest} = useRouter()
    const which = asPath.match(/^\/\w+/)[0].replace(/\//, '')
    const [mobileSideBarState, setMobileSideBarState] = useState(false)

    return (
        <section>
            <div className = 'row' style = {{flexDirection: 'row-reverse'}}>
                <div className = 'col px-0'>
                    <div className = 'vh100 flex-v bg-light po-rel'>
                        <MobileNavBar toggle = {() => setMobileSideBarState(!mobileSideBarState)} open = {mobileSideBarState} />
                        <div className = 'col-md-d-none bg-white shadow-sm'>
                            <div className = 'flex-h a-i-c py-3'>
                                <div className = 'col-auto'>
                                    <button onClick = {() => setMobileSideBarState(!mobileSideBarState)} className = 'btn bg-clear border px-3 py-2 rounded-1x'>
                                        <span className = 'bi bi-border-width fo-s-22'></span>
                                    </button>
                                </div>
                                <div className = 'col'>
                                    <div className = 'flex-h'>
                                        <span className = 'flex-1 single-line bold text-capitalize fo-s-16'>{asPath.match(/\w+$/)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = 'col-12 flex-1 px-0 py-4 overflow-y-auto'>
                            <div className="row">
                                <div className="col-12">
                                    <h5 className = 'bold text-dark text-capitalize mb-5 mt-4'>{asPath.match(/\w+$/)}</h5>
                                </div>
                            </div>
                            {children} 
                        </div>
                        <div className = 'col-md-d-none'>
                            <div className = 'w-100 bg-white border-top flex-h overflow-x-auto' style = {{flexWrap: 'nowrap'}}>{
                                URL[which] && URL[which].map(({name, href, iconName}) => (
                                    <div className = 'col-auto' key = {href}>
                                        <button title = {name} onClick = {() => window.location = href} className = 'd-block p-4 bg-clear btn border-0 w-100'>
                                            <div className = 'px-3 flex-h a-i-c j-c-c'>
                                                <div className = ''>
                                                    <span className = {`bi bi-${iconName} fo-s-18`}></span>
                                                </div>
                                                <div className = 'pl-4 col-d-none col-md-d-block flex-1 text-left'>
                                                    <span className = 'text-capitalize bold'>{name}</span>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                ))
                            }</div>
                        </div>
                    </div>
                </div>
                <div className = 'col-auto col-d-none col-md-d-block px-0'>
                    <div className = 'vh100 p-3 bg-white flex-v border-right'>
                        <div>
                            <a href = '/' className = 'text-center d-block w-100 bg-clear border-0 py-4 px-3 mb-3'>
                                <img src = '/favicon.ico' width = '30' />
                            </a>
                        </div>
                        <DesktopNavBar></DesktopNavBar>
                    </div>
                </div>
            </div>
            <section className = {`d-none po-fixed top-0 vh100 left-0 vw100 overflow-y-auto`}>
                <div id = '__floating_window' className = 'max-width-700px po-rel mx-auto shadow bg-white rounded-1x p-4 overflow-0'></div>
            </section>
            <style>{`
                .max-width-700px{
                    max-width: 700px;
                }
                .mb-4half{
                    margin-bottom: 2.5rem;
                }
                .bi{
                    vertical-align: .4rem;
                }
                .bg-half-dark{
                    background: rgba(0,0,0,.5);
                }
            `}</style>
        </section>
    )
}

const MobileNavBar = ({open, toggle}) => {
    const {asPath, ...rest} = useRouter()
    const which = asPath.match(/^\/\w+/)[0].replace(/\//, '')

    return (
        <div className = {`${open ? 'animated fadeIn' : 'd-none'} flex-h vh100 vw100 po-fixed top-0 left-0`} style = {{background: 'rgba(0,0,0,.5)', zIndex: 1000}}>
            <div className="animated flex-v slideInLeft h-100 bg-white py-4 col-12" style = {{maxWidth: '300px'}}>
                <div className="mt-4 row a-i-c j-c-space-between">
                    <div className="col">
                        <a href = '/' className = 'text-center d-block w-100 bg-clear border-0'>
                            <img src = '/images/logo.png' className = 'd-block w-100' />
                        </a>
                    </div>
                    <div className="col-auto">
                        <button onClick = {() => toggle()} className = 'btn bg-clear border px-3 py-1 rounded-1x'>
                            <span className = 'bi bi-x fa-2x'></span>
                        </button>
                    </div>
                </div>
                <div className = 'flex-1 overflow-y-auto py-5'>
                    <div className = 'w-100' style = {{flexWrap: 'nowrap'}}>{
                        URL[which] && URL[which].map(({name, href, iconName}) => (
                            <button title = {name} key = {href} onClick = {() => window.location = href} className = 'd-block mb-4 bg-clear btn w-100'>
                                <div className = 'px-2 flex-h a-i-c j-c-c'>
                                    <div>
                                        <span className = {`bi bi-${iconName} fo-s-16`}></span>
                                    </div>
                                    <div className = 'flex-1 text-left flex-h overflow-0 transit'>
                                        <span className = 'text-capitalize flex-1 single-line bold ml-4'>{name}</span>
                                    </div>
                                </div>
                            </button>
                        ))
                    }</div>
                </div>
            </div>
            <div className="h-100 flex-1"></div>
        </div>
    )
}

const DesktopNavBar = () => {
    const [onHover, setOnHover] = useState(false)
    const {asPath, ...rest} = useRouter()
    const which = asPath.match(/\/\w+/)[0].replace(/\//, '')

    return (
        <div className = 'overflow-y-auto flex-1 p-1' onMouseOver = {() => setOnHover(true)} onMouseLeave = {() => setOnHover(false)}>{
            URL[which] && URL[which].map(({name, href, iconName}) => (
                <button title = {name} key = {href} onClick = {() => window.location = href} className = 'd-block mb-4 bg-clear btn border-0 w-100'>
                    <div className = 'px-2 flex-h a-i-c j-c-c'>
                        <div className = ''>
                            <span className = {`bi bi-${iconName} fo-s-16`}></span>
                        </div>
                        <div style = {{width: onHover ? '120px' : '0px', maxWidth: onHover ? '120px' : '0px'}} className = 'flex-1 text-left flex-h overflow-0 transit'>
                            <span className = 'text-capitalize flex-1 single-line bold ml-4'>{name}</span>
                        </div>
                    </div>
                </button>
            ))
        }</div>
    )
}