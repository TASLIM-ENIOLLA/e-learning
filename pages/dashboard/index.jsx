import Template from '/components/dashboard/Template'

export default () => {
    return (
        <Template>
            <div className="row a-i-c">
				<div className="col-lg-3 mb-4">
					<div className = 'bg-white rounded-1x shadow-sm py-4 px-2'>
						<div className="row a-i-c">
                            <div className="col">
                                <div className="text-muted text-capitalize mb-2 one-line">registered courses</div>
                                <h4 className="text-primary bold m-0 one-line">{new Intl.NumberFormat().format(1234)}</h4>
                            </div>
                            <div className="col-auto">
                                <div className="bg-light px-3 py-2 border rounded-lg">
                                    <div className="bi bi-journals fa-2x text-muted"></div>
                                </div>
                            </div>
                        </div>
					</div>
				</div>
				<div className="col-lg-3 mb-4">
					<div className = 'bg-white rounded-1x shadow-sm py-4 px-2'>
						<div className="row a-i-c">
                            <div className="col">
                                <div className="text-muted text-capitalize mb-2 one-line">completed courses</div>
                                <h4 className="text-success bold m-0 one-line">{new Intl.NumberFormat().format(1234)}</h4>
                            </div>
                            <div className="col-auto">
                                <div className="bg-light px-3 py-2 border rounded-lg">
                                    <div className="bi bi-journal-check fa-2x text-muted"></div>
                                </div>
                            </div>
                        </div>
					</div>
				</div>
			</div>
        </Template>
    )
}