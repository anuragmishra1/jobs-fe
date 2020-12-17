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

const getJobDetailBySlug = (slug) => {
	return new Promise((resolve, reject) => {
		http.get(`/job/slug/${slug}`).then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
};

const getJobDetailById = (jobId) => {
	return new Promise((resolve, reject) => {
		http.get(`/job/${jobId}`).then((data) => {
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

const createJob = (payload) => {
	return new Promise((resolve, reject) => {
		http.post('/job', payload).then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
};

const editJob = (jobId, payload) => {
	return new Promise((resolve, reject) => {
		http.put(`/job/${jobId}`, payload).then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
};

const deleteJob = (jobId) => {
	return new Promise((resolve, reject) => {
		http.delete(`/job/${jobId}`).then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
};

const uploadLogo = (jobId, logo) => {
	return new Promise((resolve, reject) => {
		let formData = new FormData();
		formData.append('company_logo', logo);

		http.post(`/job/${jobId}/logo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
};

export {
	getJobs,
	getJobDetailBySlug,
	getJobDetailById,
	getAdminJobs,
	createJob,
	editJob,
	deleteJob,
	uploadLogo
};
