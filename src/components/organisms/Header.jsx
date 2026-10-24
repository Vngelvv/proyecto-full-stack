import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCarrito } from "../../context/CarritoContext";

export default function Header() {
  const { usuario, cerrarSesion } = useAuth();
  const { carrito } = useCarrito();
  const location = useLocation();
  const navigate = useNavigate();

  const claseActiva = ({ isActive }) => (isActive ? "active" : "");
  const cantidadCarrito = carrito ? carrito.length : 0;

  // Función para ir a Contacto sin recargar la página
  const irAContacto = () => {
    if (location.pathname === "/") {
      // Si ya estamos en el inicio, solo hacemos scroll
      const elemento = document.getElementById("contacto");
      if (elemento) {
        elemento.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Si estamos en otra página, navegamos al inicio y luego hacemos scroll
      navigate("/");
      setTimeout(() => {
        const elemento = document.getElementById("contacto");
        if (elemento) {
          elemento.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <header id="encabezado">
      <div className="contenido">
        <div className="logo-section">
          <img src="/img/logo.jpg" alt="Logo Ferretería Los Maestros" className="logo" />
          <div className="titulo">
            <h1>Ferretería Los Maestros</h1>
            <p className="eslogan">Materiales de construcción, herramientas y ferretería general</p>
          </div>
        </div>

        <nav id="menu-principal">
          <ul>
            <li><NavLink to="/" end className={claseActiva}>Inicio</NavLink></li>
            <li><NavLink to="/productos" className={claseActiva}>Catálogo</NavLink></li>
          <li>
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  irAContacto();
              }}
              style={{
                display: "block",
                padding: "12px 15px",
                backgroundColor: "var(--color-lavanda)",
                color: "var(--color-blanco)",
                borderRadius: "6px",
                fontWeight: "bold",
                textDecoration: "none",
                textAlign: "center",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--color-turquesa)")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--color-lavanda)")}
            >
              Contacto
            </a>
          </li>
            
            <li>
              <NavLink to="/carrito" className={claseActiva}>
               Carrito {cantidadCarrito}
              </NavLink>
            </li>

            {usuario ? (
              <>
                {usuario.rol === "admin" && (
                  <li><NavLink to="/panel" className={claseActiva}>Panel</NavLink></li>
                )}
                <li><NavLink to="/perfil" className={claseActiva}>Mi Perfil</NavLink></li>
                <li>
                  <button onClick={cerrarSesion} className="boton" style={{ width: "100%" }}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><NavLink to="/login" className={claseActiva}>Iniciar sesión</NavLink></li>
                <li><NavLink to="/registro" className={claseActiva}>Registro</NavLink></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}