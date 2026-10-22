import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="error-page">
      <h1>{is404 ? "Sidan hittades inte" : "Något gick fel"}</h1>
      <p>
        {is404
          ? "Sidan du letar efter finns inte eller har flyttats."
          : "Försök ladda om sidan."}
      </p>
      <Link to="/">Till startsidan</Link>
    </div>
  );
}