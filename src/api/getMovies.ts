// api/getMovies.ts
const accessToken = import.meta.env.VITE_ACCESS_KEY;

export function getMovies(page: number = 1) {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return fetch(url, options).then((res) => res.json());
}
