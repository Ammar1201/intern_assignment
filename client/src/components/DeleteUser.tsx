import { useState } from 'react';
import { removeUserReq } from '../api/Api';
import classes from './DeleteUser.module.css';

const DeleteUser = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleDeleteUser = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const removedUser = await removeUserReq(userId);
    if (removedUser.affectedRows) {
      setMessage('User removed successfully!');
    }
    else {
      const message = removedUser.message || 'Something went wrong!';
      setMessage(message);
    }
  };

  const handleInputChange = ({ target }: any) => {
    setUserId(target.value);
  };

  const handleResetMessage = () => {
    setMessage('');
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header} >Delete User</h1>
      <form className={classes.form} onSubmit={handleDeleteUser}>
        <div className={classes.formGroup} >
          <label htmlFor="userID">User ID:</label>
          <input id='userID' type="text" name="userID" required value={userId} onChange={handleInputChange} onFocus={handleResetMessage} />
        </div>
        <div>
          <input type="submit" value='Delete' />
        </div>
      </form>
      {message && <h3 className={classes.message}>{message}</h3>}
    </div>
  )
}

export default DeleteUser;