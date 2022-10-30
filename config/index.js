const dev = process.env.NODE_ENV !== 'production'

export const server = {
	frontend: {
		url: (
			(dev)
			? 'http://localhost:3000/'
			: 'http://unknown'
		)
	},
	backend: {
		url: (
			(dev)
			? 'http://localhost:80/e-learning/'
			: 'http://unknown'
		)
	},
	users: {
		fallback_photo: 'user_default.png'
	}
}
