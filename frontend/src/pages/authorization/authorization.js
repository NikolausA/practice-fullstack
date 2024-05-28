import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useStore, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { setUser } from '../../actions';
import { useFormReset } from '../../hooks';
import { ROLE } from '../../constants';
import { AuthFormError, Button, H2, Input } from '../../components';
import { selectUserRole } from '../../selectors';
import styled from 'styled-components';
import { request } from '../../utils';

const authFormShema = yup.object().shape({
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
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	font-size: 18px;
	margin: 20px 0;
`;

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormShema),
	});

	const dispatch = useDispatch();
	const store = useStore();
	const roleId = useSelector(selectUserRole);

	const [serverError, setServerError] = useState(null);

	useFormReset(reset);

	const onSubmit = ({ login, password }) => {
		request('/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса ${error}`);
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};
	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
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
				<Button type="submit" disabled={!!formError}>
					Войти
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to="/register">Регистрация</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
