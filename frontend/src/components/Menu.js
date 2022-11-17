import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <div
      className="py-2 px-4 text-center"
      style={{ background: "#E9E7E7", width: "100vw" }}
    >
      <div className="d-flex justify-content-center">
        <div className="col-1">
          <Link to="/">
            <button className="btn btn-sm btn-primary">Home</button>
          </Link>
        </div>
        <div className="col-1">
          <Link to="/asset-list">
            <button className="btn btn-sm btn-primary">All Assets</button>
          </Link>
        </div>
        <div className="col-1">
          <Link to="/my-assets">
            <button className="btn btn-sm btn-primary">My Assets</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
