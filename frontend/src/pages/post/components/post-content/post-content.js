import { useNavigate } from 'react-router-dom';
import { H2, Icon } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../../constants';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate();
	return (
		<div className={className}>
			<img src={imageUrl} alt="photo" />
			<H2>{title}</H2>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="-20px 0 20px"
				editButton={
					<Icon
						id="fa fa-pencil-square-o"
						isbutton="true"
						size="21px"
						margin="0 10px 0 0"
						onClick={() => navigate(`/post/${id}/edit`)}
					/>
				}
			/>
			<div className="text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		width: 280px;
		height: 150px;
		float: left;
		margin: 0 20px 10px 0;
	}

	& .text {
		font-size: 18px;
		white-space: pre-line;
	}
`;

PostContent.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
