import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectUserRole } from '../../../../selectors';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { addCommentAsync } from '../../../../actions';
import { PROP_TYPE, ROLE } from '../../../../constants';
import styled from 'styled-components';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState();

	const userRole = useSelector(selectUserRole);
	const dispatch = useDispatch();

	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content));
		setNewComment('');
	};

	const isGuest = userRole === ROLE.GUEST;

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Комментарий..."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<Icon
						id="fa fa-paper-plane-o"
						isbutton="true"
						size="21px"
						margin="0 0 0 10px"
						onClick={() => onNewCommentAdd(postId, newComment)}
					/>
				</div>
			)}

			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						id={id}
						postId={postId}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	margin: 0 auto;
	width: 580px;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-comment textarea {
		padding: 7px;
		width: 550px;
		height: 120px;
		resize: none;
		font-size: 18px;
	}
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};
