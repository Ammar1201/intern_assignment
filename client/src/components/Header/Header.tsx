import { NavLink } from "react-router-dom";
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink className={(headerData) => headerData.isActive ? classes.active : ''} to='/allUsers'>Show All Users</NavLink>
          </li>
          <li>
            <NavLink className={(headerData) => headerData.isActive ? classes.active : ''} to='/addUser'>Add User</NavLink>
          </li>
          <li>
            <NavLink className={(headerData) => headerData.isActive ? classes.active : ''} to='/showUser'>Show User</NavLink>
          </li>
          <li>
            <NavLink className={(headerData) => headerData.isActive ? classes.active : ''} to='/updateUser'>Update User</NavLink>
          </li>
          <li>
            <NavLink className={(headerData) => headerData.isActive ? classes.active : ''} to='/deleteUser'>Delete User</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;