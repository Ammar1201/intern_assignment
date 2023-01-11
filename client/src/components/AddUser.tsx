import { useState } from 'react';
import { addUserReq } from '../api/Api';
import classes from './AddUser.module.css';
import { User } from '../interface/User';

const AddUser = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState([]);
  const [inputs, setInputs] = useState<User>({
    email: '',
    name: '',
    phone: '',
    event_date: '',
    location: ''
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser = await addUserReq(inputs);
    if (newUser) {
      setInputs({
        email: '',
        name: '',
        phone: '',
        event_date: '',
        location: ''
      });
      setUser(newUser);
      setMessage('User added successfully!');
    }
    else {
      setInputs({
        email: '',
        name: '',
        phone: '',
        event_date: '',
        location: ''
      });
      setMessage('Something went wrong!');
    }
  };

  const handleInputsChange = ({ target }: any) => {
    switch (target.id) {
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
      // case 'LeadStatus':
      //   setInputs(prevState => { return { ...prevState, LeadStatus: target.value } });
      //   break;
      default:
        break;
    }
  };

  const handleResetMessage = () => {
    setMessage('');
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Add Patient</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup} >
          <label htmlFor="email">Email:</label>
          <input id='email' type="email" name="email" required value={inputs.email} onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="name">Name:</label>
          <input id='name' type="text" name="name" required value={inputs.name} onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="phone">Phone:</label>
          <input id='phone' type="text" name="phone" required value={inputs.phone} onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="event_date">Event Date:</label>
          <input id='event_date' type="date" name="event_date" required value={inputs.event_date} onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="location">Location:</label>
          <input id='location' type="text" name="location" required value={inputs.location} onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        {/* <div className={classes.formGroup} >
          <label htmlFor="LeadStatus">LeadStatus:</label>
          <input id='LeadStatus' type="text" name="LeadStatus" required value={inputs.LeadStatus} onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div> */}
        <input type="submit" value='Add' />
      </form>
      {message && <h3 className={classes.message}>{message}</h3>}
    </div>
  )
}

export default AddUser;