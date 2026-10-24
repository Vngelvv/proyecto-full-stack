import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validarRegistro } from "../funciones/validaciones";

export default function Registro() {
  const [datos, setDatos] = useState({
    nombre: "", apellido: "", correo: "", contrasena: "", 
    confirmarContrasena: "", fechaNacimiento: "",
    telefono: "", direccion: "", tipoCliente: "" // Campos de contexto
  });
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validarRegistro(datos);
    
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

   // Registro exitoso - redirigir al login
    navigate("/login");
  };

  return (
    <section className="registro">
      <h2>Crear cuenta</h2>
      <p>Completa tus datos para registrarte.</p>

      <form className="formulario-registro" onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input type="text" name="nombre" value={datos.nombre} onChange={handleChange} />
          {errores.nombre && <span style={{ color: "red", fontSize: "12px" }}>{errores.nombre}</span>}
        </div>
        <div>
          <label>Apellido</label>
          <input type="text" name="apellido" value={datos.apellido} onChange={handleChange} />
          {errores.apellido && <span style={{ color: "red", fontSize: "12px" }}>{errores.apellido}</span>}
        </div>
        <div>
          <label>Correo electrónico</label>
          <input type="email" name="correo" value={datos.correo} onChange={handleChange} />
          {errores.correo && <span style={{ color: "red", fontSize: "12px" }}>{errores.correo}</span>}
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" name="contrasena" value={datos.contrasena} onChange={handleChange} />
          {errores.contrasena && <span style={{ color: "red", fontSize: "12px" }}>{errores.contrasena}</span>}
        </div>
        <div>
          <label>Confirmar contraseña</label>
          <input type="password" name="confirmarContrasena" value={datos.confirmarContrasena} onChange={handleChange} />
          {errores.confirmarContrasena && <span style={{ color: "red", fontSize: "12px" }}>{errores.confirmarContrasena}</span>}
        </div>
        <div>
          <label>Fecha de nacimiento</label>
          <input type="date" name="fechaNacimiento" value={datos.fechaNacimiento} onChange={handleChange} />
          {errores.fechaNacimiento && <span style={{ color: "red", fontSize: "12px" }}>{errores.fechaNacimiento}</span>}
        </div>
        
        {/* Campos de contexto (Requisito Crítico) */}
        <div>
          <label>Teléfono</label>
          <input type="text" name="telefono" value={datos.telefono} onChange={handleChange} />
          {errores.telefono && <span style={{ color: "red", fontSize: "12px" }}>{errores.telefono}</span>}
        </div>
        <div>
          <label>Dirección o comuna</label>
          <input type="text" name="direccion" value={datos.direccion} onChange={handleChange} />
          {errores.direccion && <span style={{ color: "red", fontSize: "12px" }}>{errores.direccion}</span>}
        </div>
        <div>
          <label>Tipo de cliente</label>
          <select name="tipoCliente" value={datos.tipoCliente} onChange={handleChange} style={{ width: "100%", padding: "12px", border: "2px solid var(--color-lavanda)", borderRadius: "7px" }}>
            <option value="">Seleccione una opción</option>
            <option value="Particular">Particular</option>
            <option value="Contratista">Contratista</option>
            <option value="Empresa">Empresa</option>
          </select>
          {errores.tipoCliente && <span style={{ color: "red", fontSize: "12px" }}>{errores.tipoCliente}</span>}
        </div>

        <button type="submit">Registrarse</button>
      </form>

      <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
      <p><Link to="/">Volver al Inicio</Link></p>
    </section>
  );
}