import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from '../../../../../../components';
import { openModal, CLOSE_MODAL, removeCommentAsync } from '../../../../../../actions';
import { selectUserRole } from '../../../../../../selectors';
import styled from 'styled-components';
import { ROLE } from '../../../../../../constants';

const CommentContainer = ({ className, id, author, postId, content, publishedAt }) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий',
				onConfirm: () => {
					dispatch(removeCommentAsync(postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

	return (
		<div className={className}>
			<div className="comment">
				<div className="information">
					<div className="author">
						<Icon
							id="fa fa-user-circle-o"
							isbutton="true"
							size="18px"
							margin="0 0 0 10px"
							onClick={() => {}}
						/>
						{author}
					</div>
					<div className="published-at">
						<Icon id="fa fa-calendar-o" size="18px" margin="0 0 0 10px" />
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon
					id="fa fa-trash-o"
					isbutton="true"
					size="21px"
					margin="0 0 0 10px"
					onClick={() => onCommentRemove(id)}
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	width: 100%;
	margin-top: 10px;

	& .comment {
		width: 550px;
		padding: 5px 10px;
		border: 1px solid black;
	}

	& .information {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
	}
`;

Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};
