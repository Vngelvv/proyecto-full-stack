import { Link } from "react-router-dom";
import { categorias } from "../data/categorias";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Index() {
  const location = useLocation(); 

  useEffect(() => {
    if (location.hash === "#contacto") {
      setTimeout(() => {
        const elemento = document.getElementById("contacto");
        if (elemento) {
          elemento.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location]);
  
  return (
    <>
      <section className="seccion">
        <h2>Bienvenidos a Ferretería Los Maestros</h2>
        <p>Somos un negocio familiar con 22 años de trayectoria en La Serena, Región de Coquimbo.</p>
        <p>Vendemos materiales de construcción, herramientas eléctricas y manuales, gasfitería y artículos de ferretería general.</p>
        <p>Contamos con más de 800 referencias disponibles para particulares y contratistas.</p>
        <Link to="/productos" className="boton">Ver Catálogo</Link>
      </section>

      <section className="seccion">
        <h2>Nuestras Categorías</h2>
        <p>Conoce los productos que ofrecemos para tus proyectos de construcción y remodelación.</p>
        
        <div className="galeria">
          {categorias.map((cat) => (
            <article className="tarjeta" key={cat.id}>
              <div className="espacio-imagen">
                <img src={cat.imagen} alt={cat.nombre} />
              </div>
              <h3>{cat.nombre}</h3>
              <p>{cat.descripcion}</p>
              <Link to={`/productos#${cat.id}`} className="boton">Ver productos</Link>
            </article>
          ))}
        </div>
      </section>

      <section id="contacto" className="seccion">
        <h2>¿Tienes alguna consulta? ¡Contáctanos!</h2>
        <p>Estamos aquí para ayudarte con tu proyecto. Escríbenos y te responderemos a la brevedad.</p>
        
        <form>
          <label>Nombre:</label>
          <input type="text" />
          <label>Correo Electrónico:</label>
          <input type="email" />
          <label>Teléfono:</label>
          <input type="text" />
          <label>Mensaje:</label>
          <textarea></textarea>
          <button type="button" className="boton">Enviar Mensaje</button>
          <button type="button" className="boton">Limpiar Formulario</button>
        </form>

        <div className="informacion-contacto" style={{ marginTop: "30px" }}>
          <h3>Información de contacto</h3>
          <p><strong>Dirección:</strong> La Serena, Región de Coquimbo</p>
          <p><strong>Correo:</strong> ferreteria@losmaestros.cl</p>
          <p><strong>Teléfono:</strong> +56 9 1234 5678</p>
          <p><strong>Horario:</strong> Lunes a Viernes: 8:30 - 19:00 hrs | Sábados: 9:00 - 14:00 hrs</p>
        </div>
      </section>
    </>
  );
}