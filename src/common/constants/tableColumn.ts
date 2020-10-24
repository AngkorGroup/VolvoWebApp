type Align = 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;

export const COLUMN_CENTER: Align = 'center';

export const ACTIONS_COLUMN = {
	title: 'Acciones',
	props: { align: COLUMN_CENTER },
};
