import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TaskCount from '../components/TaskCount';
import { getUserTask } from '../api/taskApi';
import { getAllUser } from '../api/userAuthApi';
import TaskIcon from '@mui/icons-material/Task';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarGraph from '../components/BarGraph';

const Dashboard = () => {
    const [counttask, setCounttask] = useState(0)
    const [notstartedcount, setNotstartedcount] = useState(0)
    const [progressCount, setProgressCount] = useState(0)
    const [completeCount, setCompleteCount] = useState(0)
    const [usercountno, setUsercountno] = useState(0)

    const getTaskCount = async () => {

        const getcount = await getUserTask()
        console.log('get count', getcount.data.length)
        setCounttask(getcount.data.length)

        const tasks = getcount.data;
        const inProgressTasks = tasks.filter(task => task.status === "In Progress");
        setProgressCount(inProgressTasks.length);

        const completedTasks = tasks.filter(task => task.status === "Completed");
        setCompleteCount(completedTasks.length);

        const notstartedTask = tasks.filter(task => task.status === "New");
        setNotstartedcount(notstartedTask.length);
    }

    const getUserCount = async () => {
        const getusercount_data = await getAllUser()
        console.log('User ALL', getusercount_data.data)
        setUsercountno(getusercount_data.data.length)
    }



    useEffect(() => {
        getTaskCount()
        getUserCount()
    }, [])


    return (
        <>
            <div>
                <Sidebar />
                <div className="main-content">
                    <Header />
                    <main>
                        <div className="page-header">
                            <h1>Dashboard</h1>
                            <small>Home / Dashboard</small>
                        </div>
                        <div className="page-content">
                            <div className="analytics" style={{ 'gridTemplateColumns': 'repeat(4,1fr)' }}>
                                <div className="card">
                                    <div className="card-head">
                                        <h2>{counttask}</h2>
                                        <span>
                                            <TaskIcon fontSize='large' />
                                        </span>
                                    </div>
                                    <div className="card-progress">
                                        <small>Total Tasks</small>
                                        <div className="card-indicator">
                                            <div className="indicator one" style={{ width: '60%' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-head">
                                        <h2>{notstartedcount}</h2>
                                        <span>
                                            <AssignmentIcon fontSize='large' />
                                        </span>
                                    </div>
                                    <div className="card-progress">
                                        <small>Not Started</small>
                                        <div className="card-indicator">
                                            <div className="indicator two" style={{ width: '80%' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-head">
                                        <h2>{progressCount}</h2>
                                        <span>
                                            <FormatListBulletedIcon fontSize='large' />

                                        </span>
                                    </div>
                                    <div className="card-progress">
                                        <small>In Progress</small>
                                        <div className="card-indicator">
                                            <div className="indicator two" style={{ width: '80%' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-head">
                                        <h2>{completeCount}</h2>
                                        <span>
                                            <TaskAltIcon fontSize='large' />
                                        </span>

                                    </div>
                                    <div className="card-progress">
                                        <small>Completed</small>
                                        <div className="card-indicator">
                                            <div className="indicator three" style={{ width: '65%' }} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="records table-responsive">
                                <div className="record-header">

                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        {/* Table Search Area */}
                                        <div style={{ width: "500px" }} >
                                            <TaskCount count={counttask} />
                                        </div>



                                        <div style={{ width: "500px" }} >
                                            <BarGraph data={[
                                                { label: 'Incomplete', count: notstartedcount, color: '#58508d' },
                                                { label: 'In Progress', count: progressCount, color: '#bc5090' },
                                                { label: 'Completed', count: completeCount, color: '#ff6361' },
                                            ]} />
                                        </div>


                                    </div>
                                </div>


                            </div>
                        </div>
                    </main>
                </div>
            </div>

        </>
    );
};

export default Dashboard;