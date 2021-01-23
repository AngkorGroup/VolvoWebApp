import { RoleMenu, Role } from 'common/utils';

export interface RoleColumn {
	id: string;
	name: string;
	roleMenus: string;
}

export const mapMenus = (menus: string) => {
	const roleMenus = menus.split(',');
	return roleMenus.map((m) => {
		const data = m.split('-');
		const id = data[0];
		const name = data[1];
		return { value: `${id}`, label: name };
	});
};
const mapDataMenus = (menus: RoleMenu[]) =>
	menus.map((m) => `${m.menu?.id}-${m.menu?.displayName}`).join(',');

export const mapRoles = (roles: Role[]): RoleColumn[] => {
	return roles.map((r) => ({
		id: `${r.id}`,
		name: r.name,
		roleMenus: mapDataMenus(r.roleMenus),
	}));
};
