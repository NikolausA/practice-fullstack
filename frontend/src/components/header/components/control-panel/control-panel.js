import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Icon } from '../../../../components';
import { selectUserLogin, selectUserRole } from '../../../../selectors';
import { ROLE } from '../../../../constants';
import { logout } from '../../../../actions';
import { checkAccess } from '../../../../utils';
import styled from 'styled-components';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const UserName = styled.div`
	font-size: 18px
	font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Enter</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon
							id="fa-sign-out"
							isbutton="true"
							margin="0 0 0 10px"
							onClick={onLogout}
						/>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon
					id="fa-backward"
					isbutton="true"
					margin="10px 0 0 0"
					onClick={() => navigate(-1)}
				/>
				{isAdmin && (
					<>
						<Link to="/post">
							<Icon
								id="fa-file-text-o"
								isbutton="true"
								margin="10px 0 0 16px"
							/>
						</Link>
						<Link to="/users">
							<Icon id="fa-users" isbutton="true" margin="10px 0 0 16px" />
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
