import { Menu, Option, Role } from 'common/utils';

export interface RoleColumn {
	id: string;
	name: string;
	roleMenus: Option[];
}

const mapMenus = (menus: Menu[]) =>
	menus.map((m) => ({ value: m.key, label: m.name }));

export const mapRoles = (roles: Role[]): RoleColumn[] => {
	return roles.map((r) => ({
		id: `${r.id}`,
		name: r.name,
		roleMenus: mapMenus(r.roleMenus),
	}));
};
