import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogIn,
  LogOut,
  Menu,
  X,
  User,
  ShoppingBag,
  ShoppingCart,
  Search,
} from "lucide-react";
import axios from "axios";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          { withCredentials: true }
        );

        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        // Not logged in or error
        setUser(null);
      }
    };

    checkAuth();
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
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-gray-900 text-white">
      {/* Top announcement bar */}
      <div className="bg-blue-600 py-2 text-center text-sm font-medium">
        <p>Gratis frakt på alle bestillinger over 799 kr!</p>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-white flex items-center"
            >
              <ShoppingBag
                className="inline-block mr-2 text-blue-400"
                size={28}
              />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                RockWear
              </span>
            </Link>
          </div>

          {/* Search bar - desktop only */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Søk etter produkter..."
                className="w-full py-2 px-4 pr-10 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition font-medium"
            >
              Hjem
            </Link>
            <Link
              to="/genser"
              className="text-gray-300 hover:text-white transition font-medium"
            >
              Gensere
            </Link>
            <Link
              to="/tskjorte"
              className="text-gray-300 hover:text-white transition font-medium"
            >
              T-skjorter
            </Link>

            {/* Shopping cart */}
            <Link
              to="/cart"
              className="flex items-center gap-1 text-gray-300 hover:text-white transition"
            >
              <div className="relative">
                <ShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </div>
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-300 hover:text-white transition">
                  <User size={22} />
                  <span className="hidden sm:inline-block">{user.name}</span>
                </button>
                <div className="absolute right-0 w-48 py-2 mt-2 bg-gray-800 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
                  {user.role === "admin" && (
                    <>
                      <Link
                        to="/admin"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition"
                      >
                        Admin Panel
                      </Link>
                      <Link
                        to="/admin/create-product"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition"
                      >
                        Legg til produkt
                      </Link>
                      <div className="border-t border-gray-700 my-1"></div>
                    </>
                  )}
                  <Link
                    to="/profile"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition"
                  >
                    Min profil
                  </Link>
                  <Link
                    to="/orders"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition"
                  >
                    Ordre historikk
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition"
                  >
                    Logg ut
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 text-gray-300 hover:text-white transition"
              >
                <LogIn size={20} />
                <span>Logg inn</span>
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link
              to="/cart"
              className="flex items-center gap-1 text-gray-300 hover:text-white transition"
            >
              <div className="relative">
                <ShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </div>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="mt-4 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Søk etter produkter..."
              className="w-full py-2 px-4 pr-10 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-3 border-t border-gray-700">
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="block text-gray-300 hover:text-white transition py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hjem
                </Link>
              </li>
              <li>
                <Link
                  to="/genser"
                  className="block text-gray-300 hover:text-white transition py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gensere
                </Link>
              </li>
              <li>
                <Link
                  to="/tskjorte"
                  className="block text-gray-300 hover:text-white transition py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  T-skjorter
                </Link>
              </li>

              {user ? (
                <>
                  <li className="border-t border-gray-700 pt-2 mt-2">
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                      <User size={16} />
                      <span>Hei, {user.name}</span>
                    </div>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="block text-gray-300 hover:text-white transition py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Min profil
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders"
                      className="block text-gray-300 hover:text-white transition py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Ordre historikk
                    </Link>
                  </li>

                  {user.role === "admin" && (
                    <>
                      <li className="border-t border-gray-700 mt-2 pt-2">
                        <div className="text-gray-400 text-sm mb-2">Admin</div>
                      </li>
                      <li>
                        <Link
                          to="/admin"
                          className="block text-gray-300 hover:text-white transition py-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/create-product"
                          className="block text-gray-300 hover:text-white transition py-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Legg til produkt
                        </Link>
                      </li>
                    </>
                  )}

                  <li className="border-t border-gray-700 mt-2 pt-2">
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-1 text-red-400 hover:text-red-300 transition py-2"
                    >
                      <LogOut size={18} />
                      <span>Logg ut</span>
                    </button>
                  </li>
                </>
              ) : (
                <li className="border-t border-gray-700 mt-2 pt-2">
                  <Link
                    to="/login"
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn size={18} />
                    <span>Logg inn</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>

      {/* Categories navigation - desktop only */}
      <div className="hidden md:block bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center space-x-8">
            <Link
              to="/nyheter"
              className="py-3 text-sm font-medium text-gray-300 hover:text-white transition"
            >
              Nyheter
            </Link>
            <Link
              to="/tilbud"
              className="py-3 text-sm font-medium text-gray-300 hover:text-white transition"
            >
              Tilbud
            </Link>
            <Link
              to="/dame"
              className="py-3 text-sm font-medium text-gray-300 hover:text-white transition"
            >
              Dame
            </Link>
            <Link
              to="/herre"
              className="py-3 text-sm font-medium text-gray-300 hover:text-white transition"
            >
              Herre
            </Link>
            <Link
              to="/barn"
              className="py-3 text-sm font-medium text-gray-300 hover:text-white transition"
            >
              Barn
            </Link>
            <Link
              to="/merker"
              className="py-3 text-sm font-medium text-gray-300 hover:text-white transition"
            >
              Merker
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
