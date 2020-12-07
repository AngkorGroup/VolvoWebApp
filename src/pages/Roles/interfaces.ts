import { RoleMenu, Option, Role } from 'common/utils';

export interface RoleColumn {
	id: string;
	name: string;
	roleMenus: Option[];
}

const mapMenus = (menus: RoleMenu[]) =>
	menus.map((m) => ({ value: `${m.menu?.id}`, label: m.menu?.displayName }));

export const mapRoles = (roles: Role[]): RoleColumn[] => {
	return roles.map((r) => ({
		id: `${r.id}`,
		name: r.name,
		roleMenus: mapMenus(r.roleMenus),
	}));
};
