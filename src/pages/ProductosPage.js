import { useEffect, useState } from 'react';
import api from '../api/api';
import './Producto.css';
import { useNavigate } from 'react-router-dom';

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const nombreUsuario = localStorage.getItem('nombre');

  const [nuevo, setNuevo] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    stock: '',
    proveedorId: ''
  });

  const navigate = useNavigate();

  const cargarProductos = async () => {
    const res = await api.get('/productos');
    setProductos(res.data);
  };

  const crearProducto = async e => {
    e.preventDefault();
    await api.post('/productos', nuevo);
    cargarProductos();
  };

  const eliminarProducto = async id => {
    await api.delete(`/productos/${id}`);
    cargarProductos();
  };

  const verDetalles = async producto => {
    try {
      const proveedor = await api.get(`/proveedores/${producto.proveedorId}`);
      setProductoSeleccionado({ ...producto, proveedor: proveedor.data });
    } catch (error) {
      console.error('Error al consultar proveedor:', error);
      setProductoSeleccionado({ ...producto, proveedor: { nombre: 'Error al cargar proveedor' } });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h2>Productos</h2>
        <div className="user-info">Bienvenido, {nombreUsuario}</div>
        <button className="btn-logout" onClick={logout}>Cerrar Sesión</button>
      </div>

      <form className="formulario" onSubmit={crearProducto}>
        <input placeholder="Nombre" onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })} />
        <input placeholder="Descripción" onChange={e => setNuevo({ ...nuevo, descripcion: e.target.value })} />
        <input placeholder="Precio" type="number" onChange={e => setNuevo({ ...nuevo, precio: e.target.value })} />
        <input placeholder="Categoría" onChange={e => setNuevo({ ...nuevo, categoria: e.target.value })} />
        <input placeholder="Stock" type="number" onChange={e => setNuevo({ ...nuevo, stock: e.target.value })} />
        <input placeholder="Proveedor ID" type="number" onChange={e => setNuevo({ ...nuevo, proveedorId: e.target.value })} />
        <button type="submit">Crear</button>
      </form>

      <ul className="lista-productos">
        {productos.map(p => (
          <li key={p.id} className="item-producto">
            <span>{p.nombre} - ${p.precio}</span>
            <div className="acciones">
              <button className="btn-ver" onClick={() => verDetalles(p)}>Ver</button>
              <button className="btn-eliminar" onClick={() => eliminarProducto(p.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      {productoSeleccionado && (
        <div className="detalle-producto">
          <h3>Detalles del Producto</h3>
          <p><strong>Nombre:</strong> {productoSeleccionado.nombre}</p>
          <p><strong>Descripción:</strong> {productoSeleccionado.descripcion}</p>
          <p><strong>Precio:</strong> ${productoSeleccionado.precio}</p>
          <p><strong>Categoría:</strong> {productoSeleccionado.categoria}</p>
          <p><strong>Stock:</strong> {productoSeleccionado.stock}</p>
          <p><strong>Proveedor:</strong> {productoSeleccionado.proveedor?.nombre || 'N/A'}</p>
        </div>
      )}
    </div>
  );
}
