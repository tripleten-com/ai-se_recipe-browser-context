import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main>
      <h1 className="app__heading app__heading_not-found">Page not found</h1>
      <p className="app__message app__message_not-found">
        The URL you entered doesn't match any page in this app.
      </p>
      <Link className="app__back" to="/">
        Back to recipes
      </Link>
    </main>
  );
}
