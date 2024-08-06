/*import tabler icons*/
import { ActivityIcon, AnchorIcon, DeviceDesktopIcon, ShoppingCartIcon } from 'vue-tabler-icons';
import type { revenueCards, projectTable, recentComments } from '@/types/components/dashboards/ClassicDash';
import img1 from '@/assets/images/profile/1.jpg';
import img2 from '@/assets/images/profile/2.jpg';
import img3 from '@/assets/images/profile/3.jpg';
import img4 from '@/assets/images/profile/4.jpg';
import img5 from '@/assets/images/profile/5.jpg';

const revenueCardsData: revenueCards[] = [
    {
        title: 'Total Julio',
        iconcolor: 'bg-secondary',
        icon: ActivityIcon,
        number: '$163,249'
    },
    {
        title: 'Corporativo',
        iconcolor: 'bg-warning',
        icon: DeviceDesktopIcon,
        number: '$52,376'
    },
    {
        title: 'La Paz',
        iconcolor: 'bg-primary',
        icon: ShoppingCartIcon,
        number: '$11,795'
    },
    {
        title: 'Alimentos',
        iconcolor: 'bg-error',
        icon: AnchorIcon,
        number: '$31,687'
    }
];

const projectTableData: projectTable[] = [
    {
        img: img1,
        activestate: '',
        leadname: 'Andrés',
        leademail: 'Capital Humano',
        projectname: 'Víaticos',
        statuscolor: 'success',
        statustext: 'Bajo',
        money: '$3.9K'
    },
    {
        img: img2,
        activestate: 'active',
        leadname: 'María',
        leademail: 'Supervisor',
        projectname: 'Energía',
        statuscolor: 'info',
        statustext: 'Medio',
        money: '$23.9K'
    },
    {
        img: img3,
        activestate: '',
        leadname: 'Juan',
        leademail: 'Desarrollo',
        projectname: 'Integra',
        statuscolor: 'deep-purple accent-2 white--text',
        statustext: 'Alto',
        money: '$12.9K'
    },
    {
        img: img4,
        activestate: '',
        leadname: 'Rosa',
        leademail: 'Frontend Eng',
        projectname: 'Constructora',
        statuscolor: 'error',
        statustext: 'Low',
        money: '$10.9K'
    },
    {
        img: img5,
        activestate: '',
        leadname: 'Micheal Doe',
        leademail: 'Content Writer',
        projectname: 'Helping Hands',
        statuscolor: 'warning',
        statustext: 'High',
        money: '$12.9K'
    }
];

const recentCommentsData: recentComments[] = [
    {
        img: img1,
        activeClass: '',
        username: 'James Anderson',
        desc: 'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
        date: 'April 14, 2022',
        badgebg: 'secondary',
        status: 'Pending'
    },
    {
        img: img2,
        activeClass: 'active',
        username: 'Michael Jorden',
        desc: 'Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.',
        date: 'April 14, 2022',
        badgebg: 'success',
        status: 'Approved'
    },
    {
        img: img3,
        activeClass: '',
        username: 'Johnathan Doeting',
        desc: 'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
        date: 'April 14, 2022',
        badgebg: 'error',
        status: 'Rejected'
    },
    {
        img: img4,
        activeClass: '',
        username: 'James Anderson',
        desc: 'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
        date: 'April 14, 2022',
        badgebg: 'info',
        status: 'Pending'
    }
];

export { revenueCardsData, projectTableData, recentCommentsData };
