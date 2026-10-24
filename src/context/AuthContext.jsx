import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Intentar recuperar la sesión de localStorage al iniciar
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });
  
  // Lista de usuarios en memoria
  const [usuarios, setUsuarios] = useState([
    { 
      nombre: "Administrador", 
      apellido: "Sistema", 
      correo: "admin@losmaestros.cl", 
      contrasena: "Admin123", 
      rol: "admin" 
    }
  ]);

  // Guardar en localStorage cada vez que cambia el usuario
  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario");
    }
  }, [usuario]);

  const iniciarSesion = (correo, contrasena) => {
    const userFound = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
    
    if (userFound) {
      setUsuario(userFound);
      return true;
    }
    return false;
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  const registrarUsuario = (datos) => {
    const nuevoUsuario = { ...datos, rol: "cliente" };
    setUsuarios([...usuarios, nuevoUsuario]);
  };

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion, registrarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);