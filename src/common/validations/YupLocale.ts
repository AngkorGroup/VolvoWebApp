import * as yup from 'yup';

yup.setLocale({
	mixed: {
		default: 'No es válido',
		required: 'El campo es requerido',
		notType: 'El campo debe ser de tipo ${type}',
	},
	string: {
		email: 'Debe ser un correo válido',
		max: 'Debe tener como máximo ${max} caracteres',
	},
	number: {
		integer: 'El número debe ser entero',
		max: 'El número debe ser menos de ${max}',
	},
});

export default yup;
