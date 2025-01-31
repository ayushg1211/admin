import React from 'react';
import { useState } from 'react';
import '../../css/ManagementUserCard.css';
import Flash from '../../services/Flash';
import Request from '../../services/Request';

function ManagementUserCard(props) {

    const [userStatus, setUserStatus] = useState(props.details.isActive);

    const updateStatus = () => {
        let url = "http://localhost:8080/QuizWit/ManagementUser";
        let data = {
            userId: props.details.userId,
            status: props.details.isActive,
            operation: "UpdateUserStatus"
        }
        Request.post(url, data)
        .then((res) => {
            if(res.success) {
                setUserStatus(!userStatus);
                Flash.message(res.success, 'bg-success');
            }
            else Flash.message(res.error, 'bg-danger');
            // props.fetchUsers();
        })
    }
    return (
    <div className='management-user-card'>
        <label className='details'>
            <input type="radio" name="managementUser[]" className='mr-10' value={props.details.userId} />
            <span>
                <div className='flex-row ai-c jc-sb'>
                    <div className='flex-col jc-sb'>
                        <div className='username'><b>Username:</b> {props.details.username}</div>
                        <p className='pl-20'>
                            {userStatus == 1 ? <span className='success'><i className='fa fa-dot-circle-o mr-5'></i>Active</span> : <span className='danger'><i className='fa fa-dot-circle-o mr-5'></i>Inactive</span>}
                        </p>
                    </div>
                    <div className='flex-row jc-e'>
                        <label className="custom-toggle-btn">
                            <input type="checkbox" defaultChecked={userStatus == 1 ? true : false} value={props.details.userId} onClick={updateStatus} />
                            <span>
                                <i className="fas fa-check"></i>
                            </span>
                        </label>
                    </div>
                </div>
            </span>
        </label>
    </div>
    )
}

export default ManagementUserCard