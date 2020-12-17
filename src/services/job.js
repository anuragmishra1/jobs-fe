'us strict';

import http from './axios';

const getJobs = () => {
	return new Promise((resolve, reject) => {
		http.get('/jobs/all').then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
};

const getJobDetail = (slug) => {
	return new Promise((resolve, reject) => {
		http.get(`/job/slug/${slug}`).then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
};

const getAdminJobs = () => {
	return new Promise((resolve, reject) => {
		http.get('/jobs').then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
};

export {
	getJobs,
	getJobDetail,
	getAdminJobs
};
