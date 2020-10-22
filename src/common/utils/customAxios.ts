import axios from 'axios';

const BASE_URL = 'https://volvocashapi.azurewebsites.net/api/';

export default (() => {
	//const userToken = getLocalValue('userToken');
	//const headers = userToken ? { Authorization: `Bearer ${userToken}` } : {};
	const volvoAxios = axios.create({
		baseURL: BASE_URL,
		//headers,
	});

	return volvoAxios;
})();
