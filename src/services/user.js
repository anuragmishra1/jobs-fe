'use strict';

import http from './axios';

const login = (payload) => {
	return new Promise((resolve, reject) => {
		http.post('/user/login', payload).then((data) => {
			resolve(data);
		}).catch((err) => {
			reject(err);
		});
	});
};

export {
	login
};
