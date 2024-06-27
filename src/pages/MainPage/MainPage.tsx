import { MovieCard } from "@/components/movie";
import { usePopularMovies } from "@/components/shared/hooks/useMovies";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

function MainPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePopularMovies();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "pending") return <div>로딩중</div>;
  if (status === "error") return <div>오류 발생!</div>;

  return (
    <div className="bg-slate-800">
      <div>
        {data?.pages.map((page, i) => (
          <div className="container mx-auto px-4 " key={i}>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
              {page.results.map((movie) => (
                <li
                  key={movie.id}
                  className="border shadow-md p-4 m-4 rounded-3xl bg-white/90"
                >
                  <Link to={`movie/${movie.id}`}>
                    <MovieCard movie={movie} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div ref={ref}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "No more movies"}
      </div>
    </div>
  );
}

export default MainPage;
