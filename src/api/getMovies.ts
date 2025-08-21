const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjVhNzdiMDIyN2FjYmNkM2VmYWJlOWJkMTljNjlkYiIsIm5iZiI6MTc1NTgwMzU5NS42MSwic3ViIjoiNjhhNzZmY2I0NjMwZTFlYTM4ZmQyYzQyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.LCHRnrTWjSAJkXm_rg_nzHZkEWms6XdjBm97T-Gby6w'
  }
};

const moviesPromise = fetch(url, options).then(res => res.json());

export function getMovies() {
  return moviesPromise
}