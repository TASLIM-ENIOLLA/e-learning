import {useState, useEffect} from 'react'
import {server} from '../../config'
import {toast} from '/components/toast'

export const PageComponent = ({children}) => {
    return (
        <section>
            <Header />
            {children}
            <Footer />
        </section>
    )
}

export const Banner = () => {
    return (
        <section className = 'bg-banner'>
            <div className = 'container'>
                <div className = 'row a-i-c j-c-c text-center' style = {{minHeight: '80vh'}}>
                    <div className = 'col-lg-10 mb-5'>
                        <h5 className = 'text-white fa-4x text-uppercase bold'>welcome to <span className = 'theme-color'>university</span></h5>
                        <h4 className = 'text-white text-sentence'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form</h4>
                        <div className = 'row mt-5 j-c-c'>
                            <div className = 'col-auto'>
                                <button className = 'py-3 px-5 theme-bg text-white border-0 rounded-1x text-uppercase'>all courses</button>
                            </div>
                            <div className = 'col-auto'>
                                <button className = 'py-3 px-5 bg-clear text-white border rounded-1x text-uppercase'>read more</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .bg-banner{
                    background-image: linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url(/images/course.jpg);
                    background-size: cover;
                    background-position: center;
                }
            `}</style>
        </section>
    )
}

export const TopRibbon = ({accountType}) => {
    const [pathname, setPathname] = useState('')

    useEffect(() => {
        setPathname(window.location.pathname)
    }, [])

    return (
        <div className = 'bg-dark-blue col-d-none col-md-d-block'>
            <div className="container text-white">
                <div className="row j-c-space-between a-i-c">
                    <div className=" text-capitalize">
                        contact: Faculty of CIS, university of ilorin, nigeria
                    </div>
                    <div className="">{(
                        (accountType == undefined)
                        ? (
                            <>
                                <a href = {`/log-in${(
                                    (pathname !== '/')
                                    ? `?continue_url=${pathname}`
                                    : ''
                                )}`} className = 'd-inline-block animated fadeIn text-white text-capitalize border-0 px-3 py-2 bg-orange'>log in</a>
                                <a href = {`/sign-up${(
                                    (pathname !== '/')
                                    ? `?continue_url=${pathname}`
                                    : ''
                                )}`} className = 'd-inline-block animated fadeIn text-white text-capitalize border-0 px-3 py-2 bg-pale-blue'>sign up</a>
                            </>
                        )
                        : (
                            <>
                                <a href = '/my-account' className = 'cursor-pointer d-inline-block animated fadeIn text-white text-capitalize border-0 px-3 py-2 bg-pale-blue'>my account</a>
                                <span onClick = {() => {
                                    if(confirm('Are you sure you want to logout?')){
                                        document.cookie = `E_LEARNING=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
                                        window.location = '/'
                                    }
                                }} className = 'cursor-pointer d-inline-block animated fadeIn text-white text-capitalize border-0 px-3 py-2 bg-orange'>logout</span>
                            </>
                        )
                    )}</div>
                </div>
            </div>
        </div>
    )
}

export const NavBar = () => {
    return (
        <div className = 'bg-white'>
            <div className="container">
                <div className="row py-4 px-3 j-c-space-between a-i-c">
                    <div>
                        <a href="/">
                            <img src = '/images/logo.png' alt = "Education Master Logo"/>
                        </a>
                    </div>
                    <div className = 'text-capitalize col-d-none col-lg-d-block'>
                        <a className = 'd-inline-block mx-3 bold letter-spacing-1' href="/">home</a>
                        <a className = 'd-inline-block mx-3 bold letter-spacing-1' href="/about-us">about us</a>
                        <a className = 'd-inline-block mx-3 bold letter-spacing-1' href="/mdas">MDAs</a>
                        <a className = 'd-inline-block mx-3 bold letter-spacing-1' href="/courses">courses</a>
                        <a className = 'd-inline-block mx-3 bold letter-spacing-1' href="/contact-us">contact us</a>
                    </div>
                    <div className = 'col-lg-d-none'>
                        <div className = 'border rounded-1x px-3 py-2 shadow-sm cursor-pointer'>
                            <span className = 'bi bi-border-width fa-2x'></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const SearchBar = () => {
    const [searchResult, setSearchResult] = useState([])
    const [datalist, setDatalist] = useState(false)

    const Datalist = ({children}) => (
        <div style = {{maxHeight: '200px', zIndex: 1000}} className = 'mt-2 po-abs rounded-lg top-100pcent left-0 w-100 bg-white shadow-sm overflow-y-auto'>
            {children}
        </div>
    )

    const DatalistItem = ({name, href, id}) => (
        <a href = {`/courses/${id}`} className = 'p-3 d-block cursor-pointer border-bottom bold' key = {id}>{name}</a>
    )

    useEffect(() => {
        fetch(`${server.backend.url}/php/processes/admin/courses.php`)
        .then(res => res.json())
        .then(({data}) => setSearchResult(data))
    }, [])

    return (
        <div className = 'bg-dark-blue p-3'>
            <div className="container">
                <div className="row j-c-c a-i-c">
                    <div className = 'outline-0 bg-white pl-3 flex-h col-12 col-md-8 px-0 rounded'>
                        <div className = 'flex-v a-i-c j-c-c'>
                            <span className = 'bi bi-search fo-s-15 text-muted'></span>
                        </div>
                        <div className = 'flex-1 po-rel'>
                            <input type="text" onBlur = {() => setTimeout(() => setDatalist(false), 500)} onFocus = {() => setDatalist(true)} placeholder = 'Search courses' className = 'p-3 bg-clear w-100 d-block border-0 outline-0' list = "courses" />
                            <div className = {datalist ? '' : 'd-none'}>
                                <Datalist>{
                                    searchResult.map(({name, id}) => <DatalistItem name = {name} id = {id} key = {id} />)
                                }</Datalist>
                            </div>
                        </div>
                        <button className = 'd-none bg-orange text-capitalize text-white border-0 outline-0 px-5'>search</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Header = () => {
    return (
        <section>
            <SearchBar />
            <div className = 'bg-dark-blue bg-splash py-5'>
                <div className = 'container'>
                    <div className = 'row a-i-c' style = {{padding: '15vh 0'}}>
                        <div className = 'text-white text-c w-100 px-4'>
                            <h1 className = 'text-uppercase bold fo-s-55px'>welcome to <span className = 'text-orange fo-s-55px'>university</span></h1>
                            <p className = 'fo-s-18px my-4'>
                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form
                            </p>
                            <div className = 'mx-auto col-md-7 py-4'>
                                <div className = 'row mx-auto' style = {{maxWidth: '500px'}}>
                                    <div className = 'col-xs-12 mb-3 col-sm-6'>
                                        <button className = 'w-100 d-block p-3 fo-s-15px rounded shadow border-0 outline-0 bg-orange text-white text-uppercase single-line'>all courses</button>
                                    </div>
                                    <div className = 'col-xs-12 mb-3 col-sm-6'>
                                        <button className = 'w-100 d-block p-3 fo-s-15px rounded shadow border outline-0 bg-clear text-white text-uppercase single-line'>read more</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export const Footer = () => {
    return (
        <section>
            <div className = 'bg-orange py-5'>
                <div className="container">
                    <div className="row a-i-c px-4 text-white">
                        <div className = 'col-xs-12 col-md-3 p-3'>
                            <img width = '100' src = '/images/3.png' />
                        </div>
                        <div className = 'col-xs-12 col-md-9 flex-1 p-3'>
                            <h2 className = 'bold letter-spacing-1'>THEREFORE ALWAYS FREE FROM REPETITION</h2>
                            <p className = ''>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</p>
                        </div>
                        <div className = 'd-none col-xs-12 col-md-3 p-3'>
                            <button className = 'p-3 d-block w-100 bg-white shadow border-0 outline-0 text-capitalize rounded-2x border'>
                                book this course
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className = 'bg-dark-blue p-5'>
                <div className = 'container py-3'>
                    <div className="row">
                        <div className="col-12 tableu">
                            <div className="tableu row py-5">
                                <div className="col-lg-4 mb-4 border-right">
                                    <div className = 'bold text-white flex-h letter-spacing-1 text-uppercase'>
                                        <span className = 'flex-1 single-line'>top courses</span>
                                    </div>
                                    <div className = 'row pt-4' style = {{margin: '0px -15px'}}>
                                        <div className = 'col-xs-12 col-md-6'>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>accounting / finance</a>
                                            </div>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>art / design</a>
                                            </div>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>business management</a>
                                            </div>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>physical education</a>
                                            </div>
                                        </div>
                                        <div className = 'col-xs-12 col-md-6'>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>civil engineering</a>
                                            </div>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>marine engineering</a>
                                            </div>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>journalism / writing</a>
                                            </div>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>political science</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-4 border-right">
                                    <div className = 'bold text-white flex-h letter-spacing-1 text-uppercase'>
                                        <span className = 'flex-1 single-line'>new courses</span>
                                    </div>
                                    <div className = 'row pt-4' style = {{margin: '0px -15px'}}>
                                        <div className = 'col-xs-12 col-md-6'>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>sciences</a>
                                            </div>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>statistics</a>
                                            </div>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>web design / development</a>
                                            </div>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>SEO</a>
                                            </div>
                                        </div>
                                        <div className = 'col-xs-12 col-md-6'>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>google business</a>
                                            </div>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>graphics design</a>
                                            </div>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>networking courses</a>
                                            </div>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>information technology</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-4">
                                    <div className = 'bold text-white flex-h letter-spacing-1 text-uppercase'>
                                        <span className = 'flex-1 single-line'>help &amp; support</span>
                                    </div>
                                    <div className = 'row pt-4' style = {{margin: '0px -15px'}}>
                                        <div className = 'col-xs-12 col-md-6'>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>24 / 7 live help</a>
                                            </div>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>contact us</a>
                                            </div>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>feedback</a>
                                            </div>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>FAQs</a>
                                            </div>
                                        </div>
                                        <div className = 'col-xs-12 col-md-6'>
                                            <div className="pb-2 text-capitalize flex-h">
                                                <a href = "" className = 'text-muted flex-1 single-line'>safety tips</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 tableu">
                            <div className="tableu row border-top py-5">
                                <div className="col-lg-4 mb-4 border-right">
                                    <div className = 'bold text-white flex-h letter-spacing-1 text-uppercase'>
                                        <span className = 'flex-1 single-line'>get in touch</span>
                                    </div>
                                    <div className = 'row pt-4' style = {{margin: '0px -15px'}}>
                                        <div className = 'col-xs-12 col-12'>
                                            <div className="pb-2 text-capitalize">
                                                <a href = "" className = 'text-muted'>Address: facilty of CIS, university of ilorin, Nigeria</a>
                                            </div>
                                            <div className="pb-2 text-capitalize">
                                                <a href = "tel://+234 901 2345 678" className = 'text-muted'>Phone: +234 901 2345 678</a>
                                            </div>
                                            <div className="pb-2 text-lowercase">
                                                <a href = "mailto://e-learning@gmail.com" className = 'text-muted'>Email: e-learning@gmail.com</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-4 border-right">
                                    <div className = 'bold text-white flex-h letter-spacing-1 text-uppercase'>
                                        <span className = 'flex-1 single-line'>download our free mobile apps</span>
                                    </div>
                                    <div className = 'row pt-4' style = {{margin: '0px -15px'}}>
                                        <div className = 'col-xs-12 col-12'>
                                            <MobileAppStores />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-4">
                                    <div className = 'bold text-white flex-h letter-spacing-1 text-uppercase'>
                                        <span className = 'flex-1 single-line'>social media</span>
                                    </div>
                                    <div className = 'row pt-4' style = {{margin: '0px -15px'}}>
                                        <div className = 'col-xs-12 col-12'>
                                            <div className="d-inline-block">
                                                <span className = 'flex-h j-c-c a-i-c rounded-circle mr-3 border' style = {{width: '40px', height: '40px'}}>
                                                    <span className = 'text-white fo-s-18px fa fa-facebook'></span>
                                                </span>
                                            </div>
                                            <div className="d-inline-block">
                                                <span className = 'flex-h j-c-c a-i-c rounded-circle mr-3 border' style = {{width: '40px', height: '40px'}}>
                                                    <span className = 'text-white fo-s-18px fa fa-twitter'></span>
                                                </span>
                                            </div>
                                            <div className="d-inline-block">
                                                <span className = 'flex-h j-c-c a-i-c rounded-circle mr-3 border' style = {{width: '40px', height: '40px'}}>
                                                    <span className = 'text-white fo-s-18px fa fa-google-plus'></span>
                                                </span>
                                            </div>
                                            <div className="d-inline-block">
                                                <span className = 'flex-h j-c-c a-i-c rounded-circle mr-3 border' style = {{width: '40px', height: '40px'}}>
                                                    <span className = 'text-white fo-s-18px fa fa-youtube'></span>
                                                </span>
                                            </div>
                                            <div className="d-inline-block">
                                                <span className = 'flex-h j-c-c a-i-c rounded-circle mr-3 border' style = {{width: '40px', height: '40px'}}>
                                                    <span className = 'text-white fo-s-18px fa fa-whatsapp'></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export const SideBar = ({sidebarState, accountType, setSideBarState}) => {
    const [loggedIn] = useState(accountType)

    useEffect(() => {
        window.addEventListener('resize', () => {
            if(sidebarState){
                setSideBarState(false)
            }
        })
    }, [])

    return (
        <section className = {'po-fixed transit top-0 right-0 sidebar-shadow vh100 bg-white' + (
            (sidebarState)
            ? ''
            : ' translate-X-100pcent'
        )} style = {{width: "65vw"}} >
            <div className = 'container-fluid h-100 flex-v'>
                <div>
                    <div className="py-4 d-inline-block px-3 j-c-space-between a-i-c">
                        <div onClick = {() => {
                            setSideBarState(false)
                        }}>
                            <div className = 'border rounded-1x p-3 shadow-sm cursor-pointer'>
                                <span className = 'bi bi-x fa-2x text-danger'></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = 'py-4 px-3 flex-1 overflow-y-auto'>
                    <div className = 'pb-4'>
                        <div className = 'pb-2 px-1 mb-4 border-bottom'>
                            <a href="/" className = 'text-capitalize bold letter-spacing-1'>home</a>
                        </div>
                        <div className = 'pb-2 px-1 mb-4 border-bottom'>
                            <a href="/about-us" className = 'text-capitalize bold letter-spacing-1'>about us</a>
                        </div>
                        <div className = 'pb-2 px-1 mb-4 border-bottom'>
                            <a href={(
                                (accountType === 'user')
                                ? '/my-'
                                : '/'
                            ) + "courses"} className = 'text-capitalize bold letter-spacing-1'>{(
                                (accountType === 'user')
                                ? 'my'
                                : 'all'
                            )} courses</a>
                        </div>{(
                            (accountType === 'user')
                            ? (
                                <div className = 'pb-2 px-1 mb-4 border-bottom'>
                                    <a href="/my-mda" className = 'text-capitalize bold letter-spacing-1'>my MDA</a>
                                </div>
                            )
                            : (
                                <div className = 'pb-2 px-1 mb-4 border-bottom'>
                                    <a href="/mdas" className = 'text-capitalize bold letter-spacing-1'>MDAs</a>
                                </div>
                            )
                        )}
                        <div className = 'pb-2 px-1 mb-4 border-bottom'>
                            <a href="/contact-us" className = 'text-capitalize bold letter-spacing-1'>contact us</a>
                        </div>
                    </div>
                    <div className = 'pb-4'>{(
                        (loggedIn)
                        ? (
                            <>
                                <div className = 'pb-2 px-1 mb-4 border-bottom'>
                                    <a href="/my-account" className = 'text-dark-blue text-capitalize bold letter-spacing-1'>my account</a>
                                </div>
                                <div className = 'pb-2 px-1 mb-4 border-bottom'>
                                    <span href="/logout" className = 'text-orange cursor-pointer text-capitalize bold letter-spacing-1' onClick = {() => {
                                        if(confirm('Are you sure you want to logout?')){
                                            document.cookie = `E_LEARNING=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
                                            window.location.reload()
                                        }
                                    }}>logout</span>
                                </div>
                            </>
                        )
                        : (
                            <>
                                <div className = 'pb-2 px-1 mb-4 border-bottom'>
                                    <a href="/log-in" className = 'text-dark-blue text-capitalize bold letter-spacing-1'>log in</a>
                                </div>
                                <div className = 'pb-2 px-1 mb-4 border-bottom'>
                                    <a href="/sign-up" className = 'text-orange text-capitalize bold letter-spacing-1'>sign up</a>
                                </div>
                            </>
                        )
                    )}</div>
                </div>
            </div>
        </section>
    )
}

export const CourseCard = ({courseData, onClick, registered = false, href = true}) => {
    return (
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 mb-5">
            <div className = 'row p-3 border bg-white rounded-1x'>
                <div className = 'col-xs-12 px-0'>
                    <div style = {{width: '150px', height: '150px'}} className = 'border signup-bg rounded'></div>
                </div>
                <div className = 'col-xs-12 col px-0 flex-1 px-3 py-2'>
                    <div className = 'text-capitalize flex-h bold letter-spacing-1'>
                        <span className = 'flex-1 fo-s-20 text-orange pb-2 single-line'>{(
                            (typeof courseData === 'object' && courseData.name !== undefined)
                            ? courseData.name
                            : 'testing text'
                        )}</span>
                    </div>
                    <div className = 'text-capitalize flex-h bold letter-spacing-1'>
                        <span className = 'flex-1 fo-s-15 pb-2 single-line'>{(
                            (typeof courseData === 'object' && courseData.mda_name !== undefined)
                            ? courseData.mda_name
                            : 'lorem ipsum dolor sit amet consectuer'
                        )}</span>
                    </div>
                    <div className = 'text-capitalize flex-h'>
                        <span className = 'flex-1 italic pb-2 single-line'>{(
                            (typeof courseData === 'object' && courseData.description !== undefined)
                            ? courseData.description
                            : 'lorem ipsum dolor sit amet consectuer'
                        )}</span>
                    </div>
                    <div className = 'row mt-3'>
                        <div className="col-xs-12 col-sm-6 mb-3 px-0">
                            <button onClick = {() => {
                                if(href) window.location = '/courses/' + courseData.id
                                else toast({
                                    message: 'Please sign up to book course!',
                                    duration: 3000,
                                    type: 'secondary'
                                })
                            }} className = 'd-block text-c w-100 px-4 py-2 border rounded shadow underline-0 text-white single-line text-capitalize light-blue-btn'>{(
                                (registered)
                                ? 'view course'
                                : 'book course'
                            )}</button>
                        </div>
                        <div className="col-xs-12 col-sm-6 mb-3 px-0">
                            <span className = 'd-block text-c w-100 px-4 py-2 border single-line rounded underline-0 text-dark text-capitalize bg-light'>{(
                                (typeof courseData === 'object')
                                ? `${courseData.modules.length} module${(
                                    (courseData.modules.length > 1)
                                    ? 's'
                                    : ''
                                )}`
                                : '0 module'
                            )}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ModuleCard = ({counter, registered, ifNotRegistered, moduleData}) => {
    return (
        <div className = 'col-12 col-lg-6 mb-4 cursor-pointer'>
            <div onClick = {() => {
                if(registered){
                    window.location = '/module/' + moduleData.id
                }
                else if(!registered && typeof ifNotRegistered === 'function'){
                    ifNotRegistered()
                }
            }} className = 'w-100 p-3 border shadow rounded-1x flex-h'>
                <div className = 'px-2'>
                    <div className = 'video-placeholder bg-light shadow border rounded-2x h-100' style = {{width: '100px', minHeight: '110px'}}></div>
                </div>
                <div className = 'px-2 flex-1'>
                    <div className = 'text-capitalize bold flex-h letter-spacing-1'>
                        <span className = 'fo-s-16 single-line flex-1'>Module {(
                            (counter !== undefined)
                            ? counter
                            : '1'
                        )} - {(
                            (typeof moduleData === 'object' && moduleData.name !== undefined)
                            ? moduleData.name
                            : 'Lorem ipsum dolor'
                        )}</span>
                    </div>
                    <p className = 'double-line fo-s-16'>{(
                        (typeof moduleData === 'object' && moduleData.description !== undefined)
                        ? moduleData.description
                        : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta nostrum nemo asperiores repellat vero consequatur tempora rerum sit amet officiis sunt laudantium possimus eius praesentium enim eos, vel natus obcaecati dicta. Quo nemo eveniet ducimus?'
                    )}</p>
                    <div>
                        <span className = 'fo-s-16 text-capitalize d-none italic'>duration: --:-- </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const MobileAppStores = () => {
    return (
        <>
            <span className="mr-2 sprite sprite-android"></span>
            <span className="mr-2 sprite sprite-ios"></span>
        </>
    )
}
