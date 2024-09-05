import {
    MenuIcon,
    CircleIcon,
    CircleOffIcon,
    BrandChromeIcon,
    MoodSmileIcon,
    StarIcon,
    AwardIcon,
    WorldUpIcon,
    UsersGroupIcon,
    CoffeeIcon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    { header: 'Dashboard' },
    {
        title: 'Estadísticas',
        icon: CoffeeIcon,
        to: '/dashboards/classic'
    },
    { header: 'Configuración' },
    {
        title: 'Equipos',
        icon: BrandChromeIcon,
        to: '/equipos'
    },
    {
        title: 'Usuarios',
        icon: BrandChromeIcon,
        to: '/usuarios'
    },
    {
        title: 'Empresas',
        icon: BrandChromeIcon,
        to: '/empresas'
    },
    {
        title: 'Plazas',
        icon: BrandChromeIcon,
        to: '/plazas'
    },
    {
        title: 'Departamentos',
        icon: BrandChromeIcon,
        to: '/departamentos'
    },
    { header: 'Sistema' },
    {
        title: 'Usuarios',
        icon: MenuIcon,
        to: '#',
        children: [
            {
                title: 'Roles',
                icon: BrandChromeIcon,
                to: '/roles'
            },
            {
                title: 'Régimen',
                icon: BrandChromeIcon,
                to: '/regimen'
            }
        ]
    },
    { header: 'Administración' },
    {
        title: 'Usuarios',
        icon: MenuIcon,
        to: '#',
        children: [
            {
                title: 'Roles',
                icon: BrandChromeIcon,
                to: '/roles'
            },
            {
                title: 'Régimen',
                icon: BrandChromeIcon,
                to: '/regimen'
            }
        ]
    },
    {
        title: 'Empleados',
        icon: UsersGroupIcon,
        to: '/empleados'
    },
    { header: 'Others' },
    {
        title: 'Locaciones',
        icon: WorldUpIcon,
        to: '#',
        children: [
            {
                title: 'Paises',
                icon: CircleIcon,
                to: '/paises'
            },
            {
                title: 'Estados',
                icon: CircleIcon,
                to: '/estados'
            },
            {
                title: 'Municipios',
                icon: CircleIcon,
                to: '/municipios'
            },
            {
                title: 'Ciudades',
                icon: CircleIcon,
                to: '/ciudades'
            }
        ]
    },
    {
        title: 'Religiónes',
        icon: CircleIcon,
        to: '/religiones'
    },
    {
        title: 'Pacientes',
        icon: CircleIcon,
        to: '/pacientes'
    },
    {
        title: 'Especialidades',
        icon: CircleIcon,
        to: '/especialidades'
    },
    {
        title: 'Médicos',
        icon: CircleIcon,
        to: '/medicos'
    },
    {
        title: 'Menu Level',
        icon: MenuIcon,
        to: '#',
        children: [
            {
                title: 'Level 1',
                icon: CircleIcon,
                to: '/level1'
            },
            {
                title: 'Level 1',
                icon: CircleIcon,
                to: '/2level',
                children: [
                    {
                        title: 'Level 2',
                        icon: CircleIcon,
                        to: '/barry'
                    },
                    {
                        title: 'Level 2',
                        icon: CircleIcon,
                        to: '/2.2level',
                        children: [
                            {
                                title: 'Level 3',
                                icon: CircleIcon,
                                to: '/barry'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: 'Disabled',
        icon: CircleOffIcon,
        disabled: true,
        to: '/materialpro'
    },
    {
        title: 'Sub Caption',
        icon: StarIcon,
        subCaption: 'This is the subtitle',
        to: '/materialpro'
    },
    {
        title: 'Chip',
        icon: AwardIcon,
        chip: '9',
        chipColor: 'surface',
        chipBgColor: 'secondary',
        to: '/materialpro'
    },
    {
        title: 'Outlined',
        icon: MoodSmileIcon,
        chip: 'outline',
        chipColor: 'secondary',
        chipVariant: 'outlined',
        to: '/materialpro'
    },
    {
        title: 'External Link',
        icon: StarIcon,
        to: '/modernize',
        type: 'external'
    }
];

export default sidebarItem;
