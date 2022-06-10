import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from '../constants/actionTypes';
import * as api from '../api';
import { findToken } from '../utility/index.js';

//Action Creators

export const getPosts = () => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return;
    }

    const { data } = await api.fetchPosts(token);

    if (data.message === 'ok') {
      dispatch({
        type: FETCH_ALL,
        payload: data.posts,
      });
    }
  } catch (error) {
    console.error(error);
  }
  return;
};

export const createPost = (post, file) => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return 'Error';
    }

    const formData = new FormData();
    formData.append('title', post.title.trim());
    formData.append('message', post.message);
    formData.append('tags', post.tags);
    formData.append('selectedFile', file);

    const { data } = await api.createPost(formData, token);
    if (data.message === 'ok') {
      dispatch({
        type: CREATE,
        payload: data.post,
      });
    }

    return data.message;
  } catch (error) {
    console.error(error);
    return 'Error';
  }
};

export const updatePost = (id, post, file) => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return 'Error';
    }

    const formData = new FormData();
    formData.append('title', post.title.trim());
    formData.append('message', post.message);
    formData.append('tags', post.tags);
    formData.append('selectedFile', file);

    const { data } = await api.updatePost(id, formData, token);
    if (data.message === 'ok') {
      dispatch({
        type: UPDATE,
        payload: data.post,
      });
    }

    return data.message;
  } catch (error) {
    console.error(error);
    return 'Error';
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return 'Error';
    }

    const { data } = await api.deletePost(id, token);
    if (data.message === 'ok') {
      dispatch({
        type: DELETE,
        payload: id,
      });
    }

    return data.message;
  } catch (error) {
    console.error(error);
    return 'Error';
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return false;
    }

    const { data } = await api.likePost(id, token);
    if (data.message === 'ok') {
      dispatch({
        type: LIKE,
        payload: data.post,
      });
      return true;
    }
  } catch (error) {
    console.error(error);
  }

  return false;
};
