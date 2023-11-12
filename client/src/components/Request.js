const API_KEY = "2899f02f6123f09db3aecc457a24629e";

const generateRequests = (type) => {
  return {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/movie?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/${type}?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/${type}?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/${type}?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/${type}?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/${type}?api_key=${API_KEY}&with_genres=99`,
  };
};

export default generateRequests;
