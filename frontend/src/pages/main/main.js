import { useEffect, useMemo, useState } from 'react';
import { Pagination, PostCard, Search } from './components';
import { debounce } from './utils';
import { request } from '../../utils';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const PAGINATION_LIMIT = 10;

	useEffect(() => {
		request(
			`/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { posts, lastPage } }) => {
			setPosts(posts);
			setLastPage(lastPage);
		});
	}, [page, shouldSearch]);

	console.log(posts);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000));

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<Search searchPhrase={searchPhrase} onChange={onSearch} />
			{posts.length ? (
				<div className="post-list">
					{posts.map(
						({ id, imageUrl, title, content, publishedAt, comments }) => (
							<PostCard
								key={id}
								id={id}
								imageUrl={imageUrl}
								title={title}
								content={content}
								publishedAt={publishedAt}
								commentsCount={comments.length}
							/>
						),
					)}
				</div>
			) : (
				<div className="no-text-found">Статьи не нейдены</div>
			)}
			{lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
	}

	& .no-text-found {
		text-align: center;
		margin-top: 40px;
	}
`;
