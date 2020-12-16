import axios from 'axios';

const getValue = (key) => {
	return localStorage.getItem(key);
};

const instance = axios.create({
	baseURL: process.env.VUE_APP_BE_API_URL
});

instance.interceptors.request.use(function (config) {
	// Do something before request is sent
	const nonAuthURL = ['/doLogin'];
	if (!nonAuthURL.includes(config.url)) {
		config.params = {
			authToken: getValue('authToken')
		}
		config.headers['Authorization'] = `Basic ${getValue('token')}`;
	}
	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
	// Any status code that lie within the range of 2xx cause this function to trigger
	// Do something with response data
	return response.data;
}, function (error) {
	// Any status codes that falls outside the range of 2xx cause this function to trigger
	// Do something with response error
	// if (error.response.status === 401) {
	// 	localStorage.clear();
	// }
	const errObj = {
		status: error.response.status,
		statusText: error.response.statusText,
		data: error.response.data
	}
	return Promise.reject(errObj);
});

export default instance;
