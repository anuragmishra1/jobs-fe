'use strict';

import http from './axios';

const getApplicants = (jobId) => {
	return new Promise((resolve, reject) => {
		http.get(`/job/${jobId}/applicants`).then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
};

const getApplicantDetail = (jobId, applicantId) => {
	return new Promise((resolve, reject) => {
		http.get(`/job/${jobId}/applicant/${applicantId}`).then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
};

const applyForJob = (jobId, payload) => {
	return new Promise((resolve, reject) => {
		let formData = new FormData();
		for (let [key, value] of Object.entries(payload)) {
			formData.append(key, value);
		}

		http.post(`/job/${jobId}/apply`, formData, {
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
	getApplicants,
	getApplicantDetail,
	applyForJob
};
