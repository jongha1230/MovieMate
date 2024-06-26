import { Movie, MovieResponse } from "@/types/MovieType";
import { AxiosInstance } from "axios";

class MovieAPI {
  private axios: AxiosInstance;
  private API_KEY: string;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.API_KEY = import.meta.env.VITE_MOVIE_KEY as string;
  }
  // 인기 영화
  fetchPopularMovies = async (page: number = 1): Promise<MovieResponse> => {
    const response = await this.axios.get("/movie/popular", {
      params: { api_key: this.API_KEY, page },
    });
    return response.data;
  };
  // 현재 상영 영화
  fetchNowPlayingMovies = async (page: number = 1): Promise<MovieResponse> => {
    const response = await this.axios.get("/movie/now_playing", {
      params: { api_key: this.API_KEY, page },
    });
    return response.data;
  };
  // 영화 항목
  fetchMovieDetails = async (movieId: number): Promise<Movie> => {
    const response = await this.axios.get(`/movie/${movieId}`, {
      params: { api_key: this.API_KEY },
    });
    return response.data;
  };
  // 검색 데이터
  searchMovies = async (
    query: string,
    page: number = 1
  ): Promise<MovieResponse> => {
    const response = await this.axios.get("/search/movie", {
      params: { api_key: this.API_KEY, query, page },
    });
    return response.data;
  };
}

export default MovieAPI;
