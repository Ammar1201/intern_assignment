import { useState } from 'react';
import { updateUserReq, getSpecificUserReq } from '../api/Api';
import { User } from '../interface/User';
import classes from './UpdateUser.module.css';

const UpdateUser = () => {
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState<User[]>([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    name: '',
    phone: '',
    event_date: '',
    location: '',
    LeadStatus: 0,
    status_name: ''
  });

  const handleSearchUser = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const foundUser = await getSpecificUserReq(userId);
    if (foundUser[0].id) {
      setUser(foundUser);
      setInputs(prevState => { return { ...prevState, event_date: foundUser[0].event_date } });
      setShowUpdateForm(true);
    }
    else {
      const message = foundUser.message || 'Something went wrong!';
      setMessage(message);
    }
  };

  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    inputs.LeadStatus = user[0].LeadStatus || 0;
    const updatedUser = await updateUserReq(inputs, userId);
    if (updatedUser[0].id) {
      setMessage('User updated successfully!');
      setShowUpdateForm(false);
      setInputs({
        email: '',
        name: '',
        phone: '',
        event_date: '',
        location: '',
        LeadStatus: 0,
        status_name: ''
      });
      setUser([]);
    }
    else {
      const message = updatedUser.message || 'Something went wrong!';
      setMessage(message);
      setUser([]);
    }
  };

  const handleInputsChange = ({ target }: any) => {
    switch (target.id) {
      case 'userID':
        setUserId(target.value);
        break;
      case 'email':
        setInputs(prevState => { return { ...prevState, email: target.value } });
        break;
      case 'name':
        setInputs(prevState => { return { ...prevState, name: target.value } });
        break;
      case 'phone':
        setInputs(prevState => { return { ...prevState, phone: target.value } });
        break;
      case 'event_date':
        setInputs(prevState => { return { ...prevState, event_date: target.value } });
        break;
      case 'location':
        setInputs(prevState => { return { ...prevState, location: target.value } });
        break;
      case 'LeadStatus':
        setInputs(prevState => { return { ...prevState, status_name: target.value } });
        break;
      default:
        break;
    }
  };

  const handleResetMessage = () => {
    setMessage('');
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header} >Update User Information</h1>
      <form className={classes.form} onSubmit={handleSearchUser}>
        <div className={classes.formGroup} >
          <label htmlFor="userID">User ID:</label>
          <input id='userID' type="text" name="userID" required disabled={showUpdateForm} value={userId} onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <div>
          <input type="submit" value='Search' disabled={showUpdateForm} />
        </div>
      </form>
      {showUpdateForm && <form className={classes.form} onSubmit={handleUpdateUser}>
        <div className={classes.formGroup} >
          <label htmlFor="email">Email:</label>
          <input id='email' type="email" name="email" placeholder={user[0]?.email} value={inputs.email} onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="name">Name:</label>
          <input id='name' type="text" name="name" placeholder={user[0]?.name} value={inputs.name} onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="phone">Phone:</label>
          <input id='phone' type="text" name="phone" placeholder={user[0]?.phone} value={inputs.phone} onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="event_date">Event Date:</label>
          <input id='event_date' type="date" name="event_date" value={inputs.event_date} onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="location">Location:</label>
          <input id='location' type="text" name="location" placeholder={user[0]?.location} value={inputs.location} onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="LeadStatus">LeadStatus:</label>
          <input id='LeadStatus' type="text" name="LeadStatus" placeholder={user[0]?.status_name} value={inputs.status_name} onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <input type="submit" value='Update' />
      </form>}
      {message && <h3 className={classes.message}>{message}</h3>}
    </div>
  )
}

export default UpdateUser;