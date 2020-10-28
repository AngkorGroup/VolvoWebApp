import { Admin } from 'common/utils';

const KEY_TOKEN = 'AUTH_TOKEN';
const KEY_USER = 'ADMIN_INF';

export const UserRepository = {
	setToken(value: string) {
		localStorage.setItem(KEY_TOKEN, value);
	},

	getToken() {
		return localStorage.getItem(KEY_TOKEN) || '';
	},

	removeToken() {
		localStorage.removeItem(KEY_TOKEN);
	},

	setUser(data: Admin) {
		const user = JSON.stringify(data);
		localStorage.setItem(KEY_USER, user);
	},

	getUser(): Admin | null {
		const data = localStorage.getItem(KEY_USER) || '';
		if (!!data) {
			return JSON.parse(data);
		}
		return null;
	},

	removeUser() {
		localStorage.removeItem(KEY_USER);
	},
};

export default UserRepository;
