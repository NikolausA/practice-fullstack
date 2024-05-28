import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconContainer = ({ className, id, onClick, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true" onClick={onClick}></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};

	&:hover {
		cursor: ${({ isbutton }) => (isbutton ? 'pointer' : 'none')};
	}
`;

Icon.propTypes = {
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};
