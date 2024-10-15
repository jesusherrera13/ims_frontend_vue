export const formatearFecha = (fecha: string): string => {
    const fechaNueva = new Date(fecha);
    fechaNueva.setDate(fechaNueva.getDate() + 1); // Ajusta la fecha sumando un día
    const opciones: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    };
    return fechaNueva.toLocaleDateString('es-ES', opciones);
};

/* export const formatearHoraMinutos1 = (fecha: string): string => {
    const fechaNueva = new Date(fecha.replace(/-/g, '/')); // Reemplaza guiones por barras
    if (isNaN(fechaNueva.getTime())) {
        return 'Fecha no válida';
    }
    const opciones: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit'
    };
    return fechaNueva.toLocaleTimeString('es-ES', opciones);
};
 */
export const formatearHoraMinutos = (fecha: string): string => {
    const fechaNueva = new Date(fecha.replace(/-/g, '/')); // Reemplaza guiones por barras
    if (isNaN(fechaNueva.getTime())) {
        return 'Hora no válida';
    }
    const opciones: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit'
    };
    return fechaNueva.toLocaleTimeString('es-ES', opciones);
};