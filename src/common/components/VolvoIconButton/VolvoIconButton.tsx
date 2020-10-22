import { IconButton, Theme, withStyles } from '@material-ui/core';
import React from 'react';
import { Color } from '../../utils/ui';

interface VolvoIconButtonProps {
	children: React.ReactNode;
	className?: string;
	color?: Color;
	title?: string;
	onClick?:
		| ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
		| undefined;
	onBlur?: ((event: React.FocusEvent<HTMLButtonElement>) => void) | undefined;
}

const PrimaryIconButton = withStyles(({ palette }: Theme) => ({
	root: {
		borderRadius: '5px',
		padding: '5px',
		color: '#fff',
		backgroundColor: palette.primary.main,
		'&:hover': {
			backgroundColor: palette.primary.main,
		},
	},
}))(IconButton);

const SuccessIconButton = withStyles(({ palette }: Theme) => ({
	root: {
		borderRadius: '5px',
		padding: '5px',
		color: '#fff',
		backgroundColor: palette.success.main,
		'&:hover': {
			backgroundColor: palette.success.main,
		},
	},
}))(IconButton);

const WarningIconButton = withStyles(({ palette }: Theme) => ({
	root: {
		borderRadius: '5px',
		padding: '5px',
		color: '#fff',
		backgroundColor: palette.warning.main,
		'&:hover': {
			backgroundColor: palette.warning.main,
		},
	},
}))(IconButton);

const InfoIconButton = withStyles(({ palette }: Theme) => ({
	root: {
		borderRadius: '5px',
		padding: '5px',
		color: '#fff',
		backgroundColor: palette.info.main,
		'&:hover': {
			backgroundColor: palette.info.main,
		},
	},
}))(IconButton);

const ErrorIconButton = withStyles(({ palette }: Theme) => ({
	root: {
		borderRadius: '5px',
		padding: '5px',
		color: '#fff',
		backgroundColor: palette.error.main,
		'&:hover': {
			backgroundColor: palette.error.main,
		},
	},
}))(IconButton);

const COMPONENT_BY_COLOR = {
	primary: PrimaryIconButton,
	success: SuccessIconButton,
	warning: WarningIconButton,
	error: ErrorIconButton,
	info: InfoIconButton,
};

const getComponentByColor = (color: Color) => {
	const Component = color && COMPONENT_BY_COLOR[color];
	return Component ? Component : IconButton;
};

const VolvoIconButton: React.FC<VolvoIconButtonProps> = ({
	children,
	className,
	color,
	title,
	onClick,
	onBlur,
}: VolvoIconButtonProps) => {
	const IconButtonComponent = getComponentByColor(color);
	return (
		<IconButtonComponent
			className={className}
			onClick={onClick}
			onBlur={onBlur}
			title={title}
		>
			{children}
		</IconButtonComponent>
	);
};

export default VolvoIconButton;
