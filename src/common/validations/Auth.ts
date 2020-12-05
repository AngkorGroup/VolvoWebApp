import yup from './YupLocale';

export interface LoginForm {
	email: string;
	password: string;
}

export interface ForgotPasswordForm {
	email: string;
}

export const LoginSchema = yup.object<LoginForm>({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

export const ForgotPasswordSchema = yup.object<ForgotPasswordForm>({
	email: yup.string().email().required(),
});
