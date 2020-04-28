import React from 'react';
import UserLayout from '../../hoc/user';
import { Link } from 'react-router-dom';

import HistoryBlock from '../utils/User/history_block';

const UserDashboard = ({user}) => {
    return (
        <UserLayout>
            <div className="user_dash_panel">
                <div className="user_info">
                    <h1>User Information</h1>
                    <ul>
                        <li>{user.userData.name}</li>
                        <li>{user.userData.lastname}</li>
                        <li>{user.userData.email}</li>
                    </ul>
                    <Link to="/user/user_profile">
                        <span>Edit Account Info</span>
                    </Link>
                </div>
                {
                    user.userData.history ?
                        <div className="history">
                            <h1>History Purchases</h1>
                            <HistoryBlock
                                products={user.userData.history}
                            />
                        </div>
                    : null
                }
            </div>
        </UserLayout>
    );
}
 
export default UserDashboard;