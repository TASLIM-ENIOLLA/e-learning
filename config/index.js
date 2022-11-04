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
export const API = {
	user: {
		courses: new URL('php/processes/Courses.php', server.backend.url).href,
		mdas: new URL('php/processes/MDAs.php', server.backend.url).href,
	},
	jwt: {
		verify: new URL('php/processes/VerifyToken.php', server.backend.url).href,
	},
	dashboard: {
		available_courses: new URL('php/processes/dashboard/AvailableCourses.php', server.backend.url).href,
		registered_courses: new URL('php/processes/dashboard/RegisteredCourses.php', server.backend.url).href,
		completed_courses: new URL('php/processes/dashboard/CompletedCourses.php', server.backend.url).href,
		profile: new URL('php/processes/dashboard/Profile.php', server.backend.url).href,
		registered_courses_list: new URL('php/processes/dashboard/RegisteredCoursesList.php', server.backend.url).href,
		course_data: new URL('php/processes/dashboard/CourseData.php', server.backend.url).href,
	},
	admin: {
		login: new URL('php/processes/admin/Login.php', server.backend.url).href,
		mdas: new URL('php/processes/admin/MDAs.php', server.backend.url).href,
		courses: new URL('php/processes/admin/Courses.php', server.backend.url).href,
		modules: new URL('php/processes/admin/Modules.php', server.backend.url).href,
		mda_data: new URL('php/processes/admin/MDAData.php', server.backend.url).href,
		course_data: new URL('php/processes/admin/CourseData.php', server.backend.url).href,
		module_data: new URL('php/processes/admin/ModuleData.php', server.backend.url).href,
		add_mda: new URL('php/processes/admin/AddMDA.php', server.backend.url).href,
		add_course: new URL('php/processes/admin/AddCourse.php', server.backend.url).href,
	}
}
