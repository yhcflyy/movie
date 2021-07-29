const request = (config) => {
	// 处理 apiUrl
	if (!config.url.startsWith('http')){
		config.url = 'http://zqapp.ktvcggl.com' + config.url;
	}
	if(!config.data){
		config.data = {};
	}
	

	let promise = new Promise(function(resolve, reject) {
		uni.request(config).then(responses => {
			// 异常
			if (responses[0]) {
				reject(responses[0]);
			} else {
				let response = responses[1].data; // 如果返回的结果是data.data的，嫌麻烦可以用这个，return res,这样只返回一个data
				if (response['code'] == 200){
					resolve(response['data']);
				}else{
					reject(response['message']);
				}
			}
		}).catch(error => {
			reject(error);
		})
	})
	return promise;
};

export default request;
