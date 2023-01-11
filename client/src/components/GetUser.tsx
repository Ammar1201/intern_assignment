import { useState } from "react";
import { getSpecificUserReq } from "../api/Api";
import { User } from "../interface/User";
import classes from './GetUser.module.css';

const GetUser = () => {
  const [user, setUser] = useState<User[]>([]);
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [showUserInformation, setShowUserInformation] = useState(false);

  // useEffect(() => {
  //   const getData = async () => {
  //     const userData = await getSpecificUserReq(userId);
  //     setUser(userData);
  //   };
  //   getData();
  // }, []);

  const handleSearchUser = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    event.preventDefault();

    const userData = await getSpecificUserReq(userId);
    if (userData) {
      console.log(userData);
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
      <form className={classes.form}>
        <div className={classes.formGroup} onSubmit={handleSearchUser} >
          <label htmlFor="userID">User ID:</label>
          <input id='userID' type="text" name="userID" value={userId} onChange={handleUserIdChange} />
        </div>
        <div>
          <input type="submit" value='Search' />
        </div>
      </form>
      {showUserInformation && <form className={classes.form} onSubmit={handleResetForm} >
        <div className={classes.formGroup} >
          <label htmlFor="email">Email:</label>
          <input id='email' type="email" name="email" disabled value={user[0].email} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="fullName">Full Name:</label>
          <input id='fullName' type="text" name="fullName" disabled />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input id='phoneNumber' type="number" name="phoneNumber" disabled />
        </div>
        <div>
          <input type="submit" value='Search Again' />
        </div>
      </form>}
      {message && <h3 className={classes.message}>{message}</h3>}
    </div>
  )
}

export default GetUser;