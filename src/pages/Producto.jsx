import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { useCarrito } from "../context/CarritoContext";

export default function Producto() {
  const { id } = useParams();
  const { productos } = useProductos();
  const { agregarAlCarrito } = useCarrito();
  
  const producto = productos.find((p) => p.id === id);
  const [cantidad, setCantidad] = useState(1);
  const [total, setTotal] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  if (!producto) {
    return (
      <section className="seccion">
        <h2>Producto no encontrado</h2>
        <Link to="/productos" className="boton">Volver al catálogo</Link>
      </section>
    );
  }

  const formatarPrecio = (precio) => {
    return "$" + precio.toLocaleString("es-CL");
  };

  const mostrarMensaje = (texto, tipo) => {
    setMensaje(texto);
    setTipoMensaje(tipo);
    setTimeout(() => {
      setMensaje("");
      setTipoMensaje("");
    }, 3000);
  };

  const calcularTotal = () => {
    const cantidadNum = Number(cantidad);
    
    if (isNaN(cantidadNum) || cantidadNum < 1) {
      mostrarMensaje("La cantidad debe ser mayor a 0", "error");
      setTotal(0);
      return;
    }
    
    if (cantidadNum > producto.stock) {
      mostrarMensaje(`Stock insuficiente. Disponible: ${producto.stock} unidades`, "error");
      setTotal(0);
      return;
    }
    
    const totalCalculado = cantidadNum * producto.precio;
    setTotal(totalCalculado);
  };

  const handleAgregarAlCarrito = () => {
    const cantidadNum = Number(cantidad);
    
    if (isNaN(cantidadNum) || cantidadNum < 1) {
      mostrarMensaje("Ingrese una cantidad válida", "error");
      return;
    }
    
    if (cantidadNum > producto.stock) {
      mostrarMensaje(`Stock insuficiente. Disponible: ${producto.stock} unidades`, "error");
      return;
    }
    
    agregarAlCarrito(producto, cantidadNum);
    mostrarMensaje(`${producto.nombre} agregado al carrito`, "exito");
  };

  return (
    <section className="detalle-producto">
      <div className="imagen-producto">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          onError={(e) => (e.target.src = "/img/default.jpg")}
        />
      </div>

      <div className="info-producto">
        <h2>{producto.nombre}</h2>
        <p className="precio-producto">{formatarPrecio(producto.precio)}</p>
        <p>{producto.descripcion}</p>

        <h3>Características</h3>
        <ul>
          {producto.caracteristicas.map((caracteristica, index) => (
            <li key={index}>{caracteristica}</li>
          ))}
        </ul>

        <p>Stock disponible: <span>{producto.stock} unidades</span></p>

        {mensaje && (
          <div
            style={{
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "15px",
              backgroundColor: tipoMensaje === "exito" ? "#d4edda" : "#f8d7da",
              color: tipoMensaje === "exito" ? "#155724" : "#721c24",
              border: `1px solid ${tipoMensaje === "exito" ? "#c3e6cb" : "#f5c6cb"}`,
              fontWeight: "bold",
            }}
          >
            {mensaje}
          </div>
        )}

        <div className="cantidad-producto">
          <label>Cantidad:</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => {
              setCantidad(e.target.value);
              setTotal(0);
            }}
            min="1"
            max={producto.stock}
          />
        </div>

        <button className="boton" onClick={calcularTotal} style={{ marginRight: "10px" }}>
          Calculadora Total
        </button>

        {total > 0 && (
          <p id="totalProducto" style={{ fontSize: "20px", fontWeight: "bold", marginTop: "15px" }}>
            Total: {formatarPrecio(total)}
          </p>
        )}

        <button 
          className="boton" 
          onClick={handleAgregarAlCarrito}
          style={{ marginTop: "15px" }}
        >
          Agregar al Carrito
        </button>

        <Link 
          to="/productos" 
          className="boton" 
          style={{ display: "block", marginTop: "15px", textAlign: "center" }}
        >
          Volver al catálogo
        </Link>
      </div>
    </section>
  );
}