import {useRouter} from 'next/router'

export const URL = {
	dashboard: [
		{name: 'dashboard', href: `/dashboard`, iconName: 'speedometer2'},
		{name: 'courses', href: `/dashboard/courses`, iconName: 'journals'},
		{name: 'profile', href: `/dashboard/profile`, iconName: 'person-circle'},
		{name: 'logout', href: `/dashboard/logout`, iconName: 'door-open-fill text-danger'},
	],
	admin: [
		{name: 'dashboard', href: `/admin`, iconName: 'speedometer2'},
		{name: 'MDAs', href: `/admin/mdas`, iconName: 'people'},
		{name: 'courses', href: `/admin/courses`, iconName: 'distribute-vertical'},
		{name: 'modules', href: `/admin/modules`, iconName: 'diagram-3'},
		// {name: 'users', href: `/admin/users`, iconName: 'people'},
		{name: 'logout', href: `/dashboard/logout`, iconName: 'door-open-fill text-danger'},
	]
}
