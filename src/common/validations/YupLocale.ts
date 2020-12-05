import * as yup from 'yup';

yup.setLocale({
	mixed: {
		default: 'No es válido',
		required: 'El campo es requerido',
		// eslint-disable-next-line
		notType: 'El campo debe ser de tipo ${type}',
	},
	string: {
		email: 'Debe ser un correo válido',
		// eslint-disable-next-line
		max: 'Debe tener como máximo ${max} caracteres',
		// eslint-disable-next-line
		min: 'Debe tener como mínimo ${min} caracteres',
	},
	number: {
		integer: 'El número debe ser entero',
		// eslint-disable-next-line
		max: 'El número debe ser menos de ${max}',
	},
});

export default yup;
