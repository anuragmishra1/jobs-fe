'us strict';

import http from './axios';

export const getJobs = () => {
	return new Promise((resolve, reject) => {
		http.get('/jobs/all').then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
};
