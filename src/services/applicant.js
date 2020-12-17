'us strict';

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

export {
	getApplicants,
	getApplicantDetail
};
