import {
    TopRibbon, NavBar, SearchBar, Footer, CourseCard
} from '../components/pages'

export default () => {
    return (
        <section>
            <TopRibbon />
            <NavBar />
            <section>
                <div className="py-5 bg-light">
                    <div className="py-5">
                        <div className = 'py-5 px-4'>
                            <h1 className = 'text-c text-capitalize mb-3'>about <span className = 'text-orange h1'>us</span></h1>
                            <p className = 'fo-s-15 text-c'>
                                Fusce id sem at ligula laoreet hendrerit venenatis sed purus. Ut pellentesque maximus lacus, nec pharetra augue.
                            </p>
                        </div>
                        <div className = 'container'>
                            <div className = 'row px-5'>
                                <div className="col-xs-12 col-sm-12 col-lg-4 border p-3">
                                    <div className = 'flex-h py-3'>
                                        <div className = 'px-3'>
                                            <img src={'/images/adv/1.png'} width = '50' />
                                        </div>
                                        <div className = 'flex-1 px-3'>
                                            <h4 className = 'text-dark-blue bold letter-spacing-1 text-capitalize'>awards</h4>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aspernatur quisquam doloremque, dolorum harum deserunt deleniti ex neque sit perferendis.</p>
                                            <div>
                                                <button className = 'bg-dark-blue text-white py-2 border-0 rounded outline-0 text-capitalize px-3'>read more</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-lg-4 border p-3">
                                    <div className = 'flex-h py-3'>
                                        <div className = 'px-3'>
                                            <img src={'/images/adv/2.png'} width = '50' />
                                        </div>
                                        <div className = 'flex-1 px-3'>
                                            <h4 className = 'text-dark-blue bold letter-spacing-1 text-capitalize'>awards</h4>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aspernatur quisquam doloremque, dolorum harum deserunt deleniti ex neque sit perferendis.</p>
                                            <div>
                                                <button className = 'bg-dark-blue text-white py-2 border-0 rounded outline-0 text-capitalize px-3'>read more</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-lg-4 border p-3">
                                    <div className = 'flex-h py-3'>
                                        <div className = 'px-3'>
                                            <img src={'/images/adv/3.png'} width = '50' />
                                        </div>
                                        <div className = 'flex-1 px-3'>
                                            <h4 className = 'text-dark-blue bold letter-spacing-1 text-capitalize'>awards</h4>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aspernatur quisquam doloremque, dolorum harum deserunt deleniti ex neque sit perferendis.</p>
                                            <div>
                                                <button className = 'bg-dark-blue text-white py-2 border-0 rounded outline-0 text-capitalize px-3'>read more</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-lg-4 border p-3">
                                    <div className = 'flex-h py-3'>
                                        <div className = 'px-3'>
                                            <img src={'/images/adv/4.png'} width = '50' />
                                        </div>
                                        <div className = 'flex-1 px-3'>
                                            <h4 className = 'text-dark-blue bold letter-spacing-1 text-capitalize'>awards</h4>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aspernatur quisquam doloremque, dolorum harum deserunt deleniti ex neque sit perferendis.</p>
                                            <div>
                                                <button className = 'bg-dark-blue text-white py-2 border-0 rounded outline-0 text-capitalize px-3'>read more</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-lg-4 border p-3">
                                    <div className = 'flex-h py-3'>
                                        <div className = 'px-3'>
                                            <img src={'/images/adv/5.png'} width = '50' />
                                        </div>
                                        <div className = 'flex-1 px-3'>
                                            <h4 className = 'text-dark-blue bold letter-spacing-1 text-capitalize'>awards</h4>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aspernatur quisquam doloremque, dolorum harum deserunt deleniti ex neque sit perferendis.</p>
                                            <div>
                                                <button className = 'bg-dark-blue text-white py-2 border-0 rounded outline-0 text-capitalize px-3'>read more</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-lg-4 border p-3">
                                    <div className = 'flex-h py-3'>
                                        <div className = 'px-3'>
                                            <img src={'/images/adv/6.png'} width = '50' />
                                        </div>
                                        <div className = 'flex-1 px-3'>
                                            <h4 className = 'text-dark-blue bold letter-spacing-1 text-capitalize'>awards</h4>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aspernatur quisquam doloremque, dolorum harum deserunt deleniti ex neque sit perferendis.</p>
                                            <div>
                                                <button className = 'bg-dark-blue text-white py-2 border-0 rounded outline-0 text-capitalize px-3'>read more</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </section>
    )
}