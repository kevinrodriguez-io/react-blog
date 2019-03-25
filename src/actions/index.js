import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsersAsync = () => async (dispatch, getState) => {
  await dispatch(fetchPostsAsync());
  const { posts } = getState();
  Array.from(new Set(posts.map(p => p.userId))) // Array.from(new Set(collection)) creates an array with unique values, it's the fastest way to do it on JS
    .forEach(id => dispatch(fetchUserAsync(id)));
};

export const fetchPostsAsync = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');
  dispatch({
    type: 'FETCH_POSTS',
    payload: response.data
  });
};

export const fetchUserAsync = (id) => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({
    type: 'FETCH_USER',
    payload: response.data
  });
};
