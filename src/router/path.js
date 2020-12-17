const ifAuthenticated = (to, from, next) => {
	if (localStorage.getItem("token")) {
		next();
		return;
	}
	next('/');
};

const ifNotAuthenticated = (to, from, next) => {
	if (!localStorage.getItem("token")) {
		next();
		return;
	}
	next('/'); // change to jobs
};

export default [
	{
		path: '/login',
		name: 'Login',
		meta: {
			header: false
		},
		component: () => import('@/views/auth/login.vue'),
		beforeEnter: ifNotAuthenticated
	},
	{
		path: '/',
		name: 'Jobs',
		meta: {
			header: true
		},
		component: () => import('@/views/public/jobs.vue')
	},
	{
		path: '/jobs',
		name: 'Admin Jobs',
		meta: {
			header: true
		},
		component: () => import('@/views/admin/jobs.vue'),
		beforeEnter: ifAuthenticated
	},
	{
		path: '/job/add',
		name: 'Add Job',
		meta: {
			header: true
		},
		component: () => import('@/views/admin/addJob.vue'),
		beforeEnter: ifAuthenticated
	},
	{
		path: '*',
		name: 'Not Found',
		meta: {
			header: true
		},
		component: () => import('@/views/404.vue')
	}
];
