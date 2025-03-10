import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, X, User, LogOut, Home, Shield } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        // User is not logged in, that's fine
        console.log("User not authenticated");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      {/* Top navigation bar */}
      <div>
        <div>
          {/* Logo and left side navigation */}
          <div>
            <div>
              <Link to="/">RockWear</Link>
            </div>

            {/* Desktop navigation links */}
            <div>
              <Link to="/">Hjem</Link>
              <Link to="/genser">Gensere</Link>
              <Link to="/tskjorte">T-skjorter</Link>
              <Link to="/products">Alle produkter</Link>
            </div>
          </div>

          {/* Right side actions */}
          <div>
            {/* User menu */}
            {!loading && (
              <div>
                {user ? (
                  <div>
                    <span>{user.name}</span>
                    <div>
                      {user.role === "admin" && (
                        <Link to="/admin">
                          <div>
                            <Shield size={16} />
                            Admin
                          </div>
                        </Link>
                      )}
                      <Link to="/account">
                        <div>
                          <User size={16} />
                          Min konto
                        </div>
                      </Link>
                      <button onClick={handleLogout}>
                        <div>
                          <LogOut size={16} />
                          Logg ut
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Link to="/login">Logg inn</Link>
                    <Link to="/register">Registrer</Link>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <div>
              <button onClick={toggleMobileMenu}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div>
          <div>
            <Link to="/" onClick={toggleMobileMenu}>
              <div>
                <Home size={18} />
                Hjem
              </div>
            </Link>
            <Link to="/genser" onClick={toggleMobileMenu}>
              Gensere
            </Link>
            <Link to="/tskjorte" onClick={toggleMobileMenu}>
              T-skjorter
            </Link>
            <Link to="/products" onClick={toggleMobileMenu}>
              Alle produkter
            </Link>

            {!user && (
              <>
                <Link to="/login" onClick={toggleMobileMenu}>
                  Logg inn
                </Link>
                <Link to="/register" onClick={toggleMobileMenu}>
                  Registrer
                </Link>
              </>
            )}

            {user && user.role === "admin" && (
              <Link to="/admin" onClick={toggleMobileMenu}>
                <div>
                  <Shield size={18} />
                  Admin panel
                </div>
              </Link>
            )}

            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
              >
                <div>
                  <LogOut size={18} />
                  Logg ut
                </div>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
