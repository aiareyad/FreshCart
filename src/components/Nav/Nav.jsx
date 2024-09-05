import React, { useContext, useState } from "react";
// import style from './Nav.module.scss'
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/imgs/logo.png";
import { UserContext } from "../TokenContext/TokenContext";

export default function Nav() {
  let navigate = useNavigate();
  let { userToken, setUserToken } = useContext(UserContext);

  function logOut() {
    localStorage.removeItem("usertoken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-md position-fixed z-1 w-100 top-0 trans">
        <div className="container">
          <Link className="navbar-brand" to="/home">
            <img src={logo} alt="logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                FreshCart
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body">
              {userToken !== null ? (
                <>
                <div className="mx-auto">

                <ul
                    className="navbar-nav text-center me-auto mb-2 mb-lg-0"
                    id="navbarContent"
                  >
                    <li className="nav-item">
                      <Link className="nav-link" aria-current="page" to="/home">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Products">
                        Products
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Categories">
                        Categories
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Brands">
                        Brands
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/WishList">
                        WishList
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/allorders">
                        All Orders
                      </Link>
                    </li>

                    <li className="nav-item text-end">
                      <Link className="nav-link" to="/cart">
                          Cart
                      </Link>
                    </li>

                  </ul>
                </div>
                </>
              ) : (
                ""
              )}

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                {userToken === null ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link "
                        aria-current="page"
                        to="/Login"
                      >
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Register">
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <span onClick={logOut} className="nav-link cursor-pointer">
                      Logout
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
