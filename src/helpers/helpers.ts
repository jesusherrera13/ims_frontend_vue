export const  formatearFecha = (fecha: string): string => {
    const fechaNueva = new Date(fecha);
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
import { parse, format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatearHoraMinutos = (fecha: string): string => {
    // Intentamos parsear la fecha según el formato esperado
    const fechaNueva = parse(fecha, 'yyyy-MM-dd HH:mm:ss', new Date());
    
    if (isNaN(fechaNueva.getTime())) {
        return 'Fecha no válida';
    }

    // Formateamos la hora y los minutos
    return format(fechaNueva, 'HH:mm', { locale: es });
};