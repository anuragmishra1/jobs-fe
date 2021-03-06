'use strict';

module.exports = {
	"transpileDependencies": [
		"vuetify"
	],
	chainWebpack: config => {
		config
			.plugin('html')
			.tap(args => {
				args[0].title = 'FLY HIRE: Job Platform';
				return args;
			})
	}
};
