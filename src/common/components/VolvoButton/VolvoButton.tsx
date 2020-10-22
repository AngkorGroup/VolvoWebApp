import { Button, Theme, withStyles } from '@material-ui/core';
import React from 'react';
import { Color } from '../../utils/ui';

interface VolvoButtonProps {
	className?: string;
	text: string;
	icon?: React.ReactNode;
	variant?: 'text' | 'outlined' | 'contained' | undefined;
	color?: Color;
	disabled?: boolean;
	type?: 'button' | 'submit' | undefined;
	onClick?:
		| ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
		| undefined;
	onBlur?: ((event: React.FocusEvent<HTMLButtonElement>) => void) | undefined;
}

const PrimaryButton = withStyles(({ palette }: Theme) => ({
	root: {
		textTransform: 'none',
		color: '#fff',
		backgroundColor: palette.primary.main,
		'&:hover': {
			backgroundColor: palette.primary.main,
		},
	},
}))(Button);

const SuccessButton = withStyles(({ palette }: Theme) => ({
	root: {
		textTransform: 'none',
		color: '#fff',
		backgroundColor: palette.success.main,
		'&:hover': {
			backgroundColor: palette.success.main,
		},
	},
}))(Button);

const WarningButton = withStyles(({ palette }: Theme) => ({
	root: {
		textTransform: 'none',
		color: '#fff',
		backgroundColor: palette.warning.main,
		'&:hover': {
			backgroundColor: palette.warning.main,
		},
	},
}))(Button);

const InfoButton = withStyles(({ palette }: Theme) => ({
	root: {
		textTransform: 'none',
		color: '#fff',
		backgroundColor: palette.info.main,
		'&:hover': {
			backgroundColor: palette.info.main,
		},
	},
}))(Button);

const ErrorButton = withStyles(({ palette }: Theme) => ({
	root: {
		textTransform: 'none',
		color: '#fff',
		backgroundColor: palette.error.main,
		'&:hover': {
			backgroundColor: palette.error.main,
		},
	},
}))(Button);

const NormalButton = withStyles(({ palette }: Theme) => ({
	root: {
		textTransform: 'none',
		color: palette.info.main,
	},
}))(Button);

const COMPONENT_BY_COLOR = {
	primary: PrimaryButton,
	success: SuccessButton,
	warning: WarningButton,
	error: ErrorButton,
	info: InfoButton,
};

const getComponentByColor = (color: Color) => {
	const Component = color && COMPONENT_BY_COLOR[color];
	return Component ? Component : NormalButton;
};

const VolvoButton: React.FC<VolvoButtonProps> = ({
	className,
	text,
	icon,
	variant,
	color,
	disabled,
	type = 'button',
	onClick,
	onBlur,
}: VolvoButtonProps) => {
	const ButtonComponent = getComponentByColor(color);
	return (
		<ButtonComponent
			variant={variant}
			className={className}
			startIcon={icon}
			disabled={!!disabled}
			type={type}
			onClick={onClick}
			onBlur={onBlur}
		>
			{text}
		</ButtonComponent>
	);
};

export default VolvoButton;
