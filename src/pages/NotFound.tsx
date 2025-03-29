import { AiOutlineWarning } from "react-icons/ai";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
                <AiOutlineWarning style={{ fontSize: "10rem", color: "red" }} />
                <h1 style={{ fontSize: "4rem", margin: "1rem 0" }}>404</h1>
                <h3 style={{ fontSize: "2rem", margin: "1rem 0" }}>Not Found</h3>
                <Link to="/" style={{ fontSize: "1.5rem", color: "blue", textDecoration: "underline" }}>
                    Go back to home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
