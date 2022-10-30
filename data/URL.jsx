import {useRouter} from 'next/router'

export const URL = {
	dashboard: [
		{name: 'dashboard', href: `/dashboard`, iconName: 'speedometer2'},
		{name: 'my courses', href: `/dashboard/my-courses`, iconName: 'journals'},
		{name: 'profile', href: `/dashboard/membership`, iconName: 'person-circle'},
		{name: 'logout', href: `/dashboard/logout`, iconName: 'door-open-fill text-danger'},
	],
	admin: [
		{name: 'dashboard', href: `/admin`, iconName: 'speedometer2'},
		{name: 'users', href: `/admin/users`, iconName: 'people'},
		{name: 'business categories', href: `/admin/business-categories`, iconName: 'distribute-vertical'},
		{name: 'plans', href: `/admin/plans`, iconName: 'bullseye'},
		{name: 'referrals', href: `/admin/referrals`, iconName: 'diagram-3'},
	]
}
