import axios from 'axios';

let sourceToken;
let queryMemo = {};

export const fetchData = async (searchValue) => {
  //Cancel prev request
  sourceToken && sourceToken.cancel('Operation canceled due to new request.');
  // Save a new CancelToken
  sourceToken = axios.CancelToken.source();
  try {
    if (queryMemo[searchValue]) {
      return queryMemo[searchValue];
    }
    let res = await axios.get(`https://www.omdbapi.com/?s=${searchValue}&apikey=5f88844d`, {
      cancelToken: sourceToken.token,
    });

    const result = res.data;
    // Store response
    queryMemo[searchValue] = result;
    return result;
  } catch (error) {
    if (axios.isCancel(error)) {
      // Handle if request was cancelled
      return { cancelPrevQuery: true };
    } else {
      // Handle usual errors
      return 'Please try again';
    }
  }
};
