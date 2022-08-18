hotels = Mock.mock({
	"array|10-20": [{
		id: '@character("upper")' + '@string("number",3)',
		name: '@ctitle',
		addr: '@city',
		mobile: '1' + '@string("number",10)'
	}]
});
Mock.mock('resouces/hotel', 'post', findHotels);
Mock.mock('resouces/updateHotel', 'post', updateHotels);
Mock.setup({
	timeout: '1000-2000'
});

function updateHotels(options) {
	var datas = parseParams(options.body);
	var id = datas.id;
	var hotel = null;
	var res = {};
	res.errorCode = 1;
	res.msg = '没有找到对应的酒店';
	for (var i = 0; i < hotels.array.length; i++) {
		hotel = hotels.array[i];
		//修改指定的路线
		if (hotel.id == id) {
			hotel.name = datas.name;
			hotel.addr = datas.addr;
			hotel.mobile = datas.mobile;
			res.errorCode = 0;
			res.msg = '成功';
			break;
		}
	}
	return res;
}

function findHotels(options) {
	console.log('findHotels');
	var datas = parseParams(options.body);
	var page = datas.page;
	var res = {};
	var start = (page - 1) * 5;
	res.hotels = hotels.array;
	var totalLength = hotels.array.length;
	if (totalLength - start > 5) {
		res.hotels = hotels.array.slice(start, start + 5);
	} else {
		res.hotels = hotels.array.slice(start);
	}
	res.length = totalLength;
	res.errorCode = 0;
	res.msg = "成功";
	return res;
}

function parseParams(paramsStr) {
	var params = {};
	var paramsStrArray = paramsStr.split('&');
	var paramList = [];
	for (var i = 0; i < paramsStrArray.length; i++) {
		paramList = paramsStrArray[i].split('=');
		params[paramList[0]] = decodeURIComponent(paramList[1]);
	}
	return params;
}
