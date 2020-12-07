import yup from './YupLocale';

export interface LoginForm {
	email: string;
	password: string;
}

export interface ForgotPasswordForm {
	email: string;
}

export interface RecoverPasswordForm {
	token: string;
	newPassword: string;
	confirmPassword: string;
}

export interface ChangePasswordForm {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export const LoginSchema = yup.object<LoginForm>({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

export const ForgotPasswordSchema = yup.object<ForgotPasswordForm>({
	email: yup.string().email().required(),
});

export const RecoverPasswordSchema = yup.object<RecoverPasswordForm>({
	token: yup.string(),
	newPassword: yup.string().required(),
	confirmPassword: yup
		.string()
		.oneOf(
			[yup.ref('newPassword'), undefined],
			'Las contraseñas deben coincidir',
		)
		.required(),
});

export const ChangePasswordSchema = yup.object<ChangePasswordForm>({
	oldPassword: yup.string().required(),
	newPassword: yup.string().required(),
	confirmPassword: yup
		.string()
		.oneOf(
			[yup.ref('newPassword'), undefined],
			'Las contraseñas deben coincidir',
		)
		.required(),
});
