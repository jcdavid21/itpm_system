
import StudentCount from './StudentCount';
import SidebarAd  from './SidebarAd';
import '../../styles/general.css'
import Card from './Card';


function Dashboard() {

    return (
        <div className='h-full mb-20 xl:ml-64 xl:pl-2'>
            <SidebarAd />
            <div className='md:text-start text-2xl font-bold border-b
            pb-2 border-b-gray-300 xl:mt-10 xl:pl-3 xl:text-4xl'>
                Dashboard
            </div>
            <div>
                <Card />
            </div>
            <div className='mt-5 pl-4 pr-10 xl:pl-0'>
                <div>
                    <StudentCount />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
