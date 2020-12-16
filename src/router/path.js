export default [
	{
		path: '/',
		name: 'Jobs',
		component: () => import('@/views/jobs.vue')
	},
	{
		path: '*',
		name: 'Not Found',
		component: () => import('@/views/404.vue')
	}
];
