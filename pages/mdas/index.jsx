import {useEffect, useState} from 'react'
import {TopRibbon, NavBar, SearchBar, Footer, CourseCard} from '../../components/pages'
import {toast} from '../../components/toast'
import {server} from '../../config'

export default function MDA(){
    const [MDAlist, setMDAlist] = useState([])
    const [category, setCategory] = useState('ministry')
    const categories = [
        'ministry',
        'department',
        'agency',
    ]

    useEffect(() => {
        fetch(`${server.backend.url}/php/processes/admin/mdas.php`)
        .then(res => res.json())
        .then(({data}) => setMDAlist(data))
    }, [])

    return (
        <section>
            <TopRibbon />
            <NavBar />
            <section className = 'border-top'>
                <div className = 'container px-4 py-5'>
                    <div className = 'py-5'>
                        <h1 className = 'text-c text-capitalize mb-3'>MDA<span className = 'text-orange h1'>s</span></h1>
                        <p className = 'text-c fo-s-15 text-capitalize'>
                            ministries - departments - agencies
                        </p>
                    </div>
                    <div className = 'row'>
                        <div className = 'col-lg-12 px-0 rounded-1x shadow-sm border overflow-x-auto'>
                            <div style = {{minWidth: '500px'}} className="row a-i-c j-c-space-between px-3 py-2">
                                <div className="col-auto my-3">
                                    <h5 className = 'text-uppercase bold text-dark m-0'>mdas</h5>
                                </div>
                                <div className="col-auto">
                                    <div className="row">{
                                        categories.map((each, index) => (
                                            <div key = {index} className="col-auto">
                                                <button onClick = {() => setCategory(each)} className={`text-capitalize transit p-3 border-0 outline-0 shadow-sm bold rounded-lg ${each == category ? 'theme-bg text-white' : 'bg-light'}`}>{each}</button>
                                            </div>
                                        ))
                                    }</div>
                                </div>
                            </div>
                            <div style = {{minWidth: '500px'}} className = 'row'>
                                <div className="col-12 bg-light py-3 border-top border-bottom">
                                    <div className="row text-capitalize">
                                        <div className="col-auto">
                                            <p className = 'bold one-line m-0 fo-s-15'>S/N</p>
                                        </div>
                                        <div className="col">
                                            <p className="one-line m-0 bold fo-s-15">MDA name</p>
                                        </div>
                                        <div className="col-2 text-center">
                                            <p className="one-line m-0 bold fo-s-15">type</p>
                                        </div>
                                        <div className="col-3">
                                            <p className="one-line m-0 bold fo-s-15">description</p>
                                        </div>
                                    </div>
                                </div>{
                                    (MDAlist.filter(({type}) => type === category).length > 0)
                                    ? (
                                        MDAlist.filter(({type}) => type === category).map(({id, name, type, description}, index) => (
                                            <div className="col-12 py-4 border-bottom" key = {id}>
                                                <div className="row text-capitalize">
                                                    <div className="col-auto">
                                                        <p className = 'one-line m-0 bold fo-s-15'>{++index}</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="one-line m-0 bold">
                                                            <a href={`/mdas/${id}`} className = 'underline fo-s-15'>{name}</a>
                                                        </p>
                                                    </div>
                                                    <div className="col-2 text-center">
                                                        <p className="one-line m-0 bold fo-s-15">{type}</p>
                                                    </div>
                                                    <div className="col-3">
                                                        <p className="double-line text-muted m-0 bold fo-s-15">{description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )
                                    : (
                                        <div className="fo-s-15 bg-light border-top col-12 p-5 text-center bold text-capitalize">
                                            empty rows returned!
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </section>
    )
}
