import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto, cantidad) => {
    const nuevoItem = { ...producto, cantidad: Number(cantidad) };
    const existe = carrito.find(item => item.id === producto.id);
    
    if (existe) {
      setCarrito(carrito.map(item => 
        item.id === producto.id 
          ? { ...item, cantidad: item.cantidad + Number(cantidad) } 
          : item
      ));
    } else {
      setCarrito(prev => [...prev, nuevoItem]);
    }
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);