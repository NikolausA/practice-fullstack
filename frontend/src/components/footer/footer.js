import { useState, useEffect } from 'react';
import styled from 'styled-components';

export const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWether] = useState('');

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?lat=53.24&lon=34.36&units=metric&lang=ru&appid=41fbdee4a01c93a4651de8021cb18434',
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp));
				setWether(weather[0].description);
			});
	}, []);

	return (
		<div className={className}>
			<div>
				<div>Web-developer's blog</div>
				<div>e-mail</div>
			</div>
			<div>
				<div>
					{city},{' '}
					{new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
				</div>
				<div>
					{temperature}, градусов, {weather}
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	background-color: #fff;
	box-shadow: 0 2px 17px #000;
`;
