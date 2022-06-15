import { Link } from "react-router-dom";
import http from '../http-common'
import { useNavigate } from "react-router-dom"

function Header(){
    const navigate = useNavigate();
    const handleLogout = (event) => {
        http.post('logout').then(response => {
            console.log(response);
            localStorage.removeItem('token');
            navigate('/login');
        }).catch(error => {
            console.log(error);
        });
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">React</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/about" className="nav-link">About Us</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Register</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" onClick={handleLogout}>Logout</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;