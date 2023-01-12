import { useEffect, useState } from "react";
import { getAllUsersReq } from "../api/Api";
import { User } from "../interface/User";
import classes from './ShowAllUsers.module.css';

const ShowAllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getData = async () => {
      const usersData = await getAllUsersReq();
      setUsers(usersData);
    };
    getData();
  }, []);

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>All Patients</h1>
      {users && users.length > 0 ? <div className={classes.table}>
        <div className={classes.tableHeader}>
          <span>NO.</span>
          <span>ID</span>
          <span>Email</span>
          <span>Name</span>
          <span>Phone</span>
          <span>event_date</span>
          <span>location</span>
          <span>LeadStatus</span>
        </div>
        {users && users.map((user, index) => {
          return <div className={classes.row} key={user.id} >
            <span>{index + 1}</span>
            <span>{user.id}</span>
            <span>{user.email}</span>
            <span>{user.name}</span>
            <span>{user.phone}</span>
            <span>{user.event_date}</span>
            <span>{user.location}</span>
            <span>{user.status_name}</span>
          </div>
        })}
      </div> : <h3>There is No Users in The Database!</h3>}
    </div>
  )
}

export default ShowAllUsers;