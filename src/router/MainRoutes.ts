const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/',
            component: () => import('@/views/dashboards/classic/Classic.vue')
        },
        {
            name: 'Classic',
            path: '/dashboards/classic',
            component: () => import('@/views/dashboards/classic/Classic.vue')
        },
        {
            name: 'Usuarios',
            path: '/usuarios',
            component: () => import('@/views/apps/user/User.vue')
        },
        {
            name: 'Accesos',
            path: '/accesos',
            component: () => import('@/views/apps/accesos/Acceso.vue')
        },
        {
            name: 'Perfiles',
            path: '/perfiles',
            component: () => import('@/views/apps/perfiles/Perfiles.vue')
        },
        {
            name: 'Usuario Perfil',
            path: '/user/profile/:id',
            component: () => import('@/views/apps/user-profile/Profile.vue')
        },
        {
            name: 'Roles',
            path: '/roles',
            component: () => import('@/views/apps/user/Rol.vue')
        },
        {
            name: 'Regimen',
            path: '/regimen',
            component: () => import('@/views/apps/user/Regimen.vue')
        },
        {
            name: 'Empresas',
            path: '/empresas',
            component: () => import('@/views/apps/empresa/Empresa.vue')
        },
        {
            name: 'Empresa Perfil',
            path: '/empresa/profile/:id',
            component: () => import('@/views/apps/empresa-profile/Profile.vue')
        },
        {
            name: 'Plazas',
            path: '/plazas',
            component: () => import('@/views/apps/plaza/Plaza.vue')
        },
        {
            name: 'Departamentos',
            path: '/departamentos',
            component: () => import('@/views/apps/departamento/Departamento.vue')
        },
        {
            name: 'Empresa Perfil',
            path: '/empresa/profile/:id',
            component: () => import('@/views/apps/empresa-profile/Profile.vue')
        },
        // LOCACIONES
        {
            name: 'Paises',
            path: '/paises',
            component: () => import('@/views/apps/pais/Pais.vue')
        },
        {
            name: 'Estados',
            path: '/estados',
            component: () => import('@/views/apps/estado/Estado.vue')
        },
        {
            name: 'Municipios',
            path: '/municipios',
            component: () => import('@/views/apps/municipio/Municipio.vue')
        },
        {
            name: 'Ciudades',
            path: '/ciudades',
            component: () => import('@/views/apps/ciudad/Ciudad.vue')
        },
        {
            name: 'Medicamentos',
            path: '/medicamentos',
            component: () => import('@/views/apps/medicamentos/Medicamentos.vue')
        },
        {
            name: 'Método de pago',
            path: '/metodo-de-pago',
            component: () => import('@/views/apps/metodo-pago/Metodo-pago.vue')
        },
        // RELIGION
        {
            name: 'Religiones',
            path: '/religiones',
            component: () => import('@/views/apps/religion/Religion.vue')
        },
        // PACIENTES
        {
            name: 'Pacientes',
            path: '/pacientes',
            component: () => import('@/views/apps/paciente/Paciente.vue')
        },
        // ESPECIALIDAD
        {
            name: 'Especialidad',
            path: '/especialidad',
            component: () => import('@/views/apps/especialidad/Especialidad.vue')
        },
        // MÉDICOS
        {
            name: 'Medicos',
            path: '/medicos',
            component: () => import('@/views/apps/medico/Medico.vue')
        },
        // CITAS
        {
            name: 'citas',
            path: '/cita',
            component: () => import('@/views/apps/cita/Cita.vue')
        },

        // ADMINISTRACIÓN
        {
            name: 'Empleados',
            path: '/empleados',
            component: () => import('@/views/apps/empleado/Empleado.vue')
        },
        {
            name: 'Empleado Perfil',
            path: '/empleado/profile/:id',
            component: () => import('@/views/apps/empleado-profile/Profile.vue')
        },
        {
            name: 'Equipos',
            path: '/equipos',
            component: () => import('@/views/apps/configuracion/equipo/Equipo.vue')
        },
        {
            name: 'Equipo Perfil',
            path: '/equipo/profile/:id',
            component: () => import('@/views/apps/configuracion/equipo-profile/Profile.vue')
        },
        {
            name: 'Sincronizacion',
            path: '/cloud',
            component: () => import('@/views/dashboards/provider/Provider.vue')
        }
    ]
};

export default MainRoutes;
