import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '45206058-c611c9adec5d897ba1c6c02b0';

export const searchPhotos = async (query, page) => {
  const axiosConfigs = {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  };

  try {
    const response = await axios.get('', axiosConfigs);

    if (response && response.data && response.data.hits) {
      return response.data;
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    console.error('Something went wrong:', error.message || error);
    throw error;
  }
};
