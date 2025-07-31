import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const status = error?.status || 404;
  const message = error?.statusText || error?.message || "Page Not Found";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center px-4">
      <h1 className="text-[6rem] font-extrabold text-yellow-400 mb-2 leading-none">
        {status}
      </h1>
      <h2 className="text-3xl font-semibold mb-3">Oops! {message}</h2>
      <p className="text-lg text-gray-400 mb-6 max-w-lg">
        The page you're looking for doesn’t exist, or something broke on our end.
      </p>
      <Link
        to="/"
        className="bg-yellow-400 text-black px-6 py-3 rounded-md font-bold hover:bg-yellow-300 transition"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
