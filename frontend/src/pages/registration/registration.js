import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useDispatch, useStore, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { setUser } from '../../actions';
import { ROLE } from '../../constants';
import { useFormReset } from '../../hooks';
import { AuthFormError, Button, H2, Input } from '../../components';
import { selectUserRole } from '../../selectors';
import { request } from '../../utils';
import styled from 'styled-components';

const regFormShema = yup.object().shape({
	login: yup
		.string()
		.required('you have to complete field')
		.matches(/^\w+$/, 'wrong login, allowed letters and digits')
		.min(3, 'not less than 3 letters')
		.max(15, 'not more than 15 letters'),
	password: yup
		.string()
		.required('field is required')
		.matches(/^[\w#%]+$/, 'wrong password, allowed letters, digits and #%')
		.min(6, '6 signs min')
		.max(30, '30 signs max'),
	confirmation: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Password confirmation does not match'),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			confirmation: '',
		},
		resolver: yupResolver(regFormShema),
	});

	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	const [serverError, setServerError] = useState(null);

	useFormReset(reset);

	const onSubmit = ({ login, password }) => {
		request('/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса ${error}`);
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};
	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.confirmation?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
			<form action="#" onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Подтверждение пароля..."
					{...register('confirmation', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
