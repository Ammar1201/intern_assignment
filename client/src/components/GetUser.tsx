import { useState } from "react";
import { getSpecificUserReq } from "../api/Api";
import { User } from "../interface/User";
import classes from './GetUser.module.css';

const GetUser = () => {
  const [user, setUser] = useState<User[]>([]);
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [showUserInformation, setShowUserInformation] = useState(false);

  const handleSearchUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = await getSpecificUserReq(userId);
    if (userData[0].id) {
      setUser(userData);
      setShowUserInformation(true);
    }
    else {
      const message = userData.message || 'Something went wrong!';
      setMessage(message);
    }
  };

  const handleResetForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage('');
    setShowUserInformation(false);
    setUserId('');
    setUser([]);
  };

  const handleUserIdChange = ({ target }: any) => {
    setUserId(target.value);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header} >Show User Information</h1>
      <form className={classes.form} onSubmit={handleSearchUser}>
        <div className={classes.formGroup} >
          <label htmlFor="userID">User ID:</label>
          <input id='userID' type="text" name="userID" value={userId} onChange={handleUserIdChange} />
        </div>
        <div>
          <input type="submit" value='Search' />
        </div>
      </form>
      {showUserInformation && <form className={classes.form} onSubmit={handleResetForm}>
        <div className={classes.formGroup} >
          <label htmlFor="email">Email:</label>
          <input id='email' type="email" name="email" disabled value={user[0].email} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="name">Name:</label>
          <input id='name' type="text" name="name" disabled value={user[0].name} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="phone">Phone:</label>
          <input id='phone' type="text" name="phone" disabled value={user[0].phone} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="event_date">Event Date:</label>
          <input id='event_date' type="date" name="event_date" disabled value={user[0].event_date} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="location">Location:</label>
          <input id='location' type="text" name="location" disabled value={user[0].location} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="LeadStatus">LeadStatus:</label>
          <input id='LeadStatus' type="text" name="LeadStatus" disabled value={user[0].status_name} />
        </div>
        <input type="submit" value='Search Again' />
      </form>}
      {message && <h3 className={classes.message}>{message}</h3>}
    </div>
  )
}

export default GetUser;