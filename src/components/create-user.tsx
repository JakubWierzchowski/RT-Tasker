import { useState } from 'react';
import { useAppDispatch } from '../lib/hooks';
import { addUser } from '../features/user-slice';

const CreateUser = () => {
  const [newRealName, setNewRealName] = useState('');
  const [newAlterEgo, setNewAlterEgo] = useState('');
  const dispatch = useAppDispatch();

  return (
    <form
      className="create-user"
      onSubmit={(e) => {
        e.preventDefault();
        const newUser: User = {
          id: '',
          tasks: [],
          realName: newRealName,
          alterEgo: newAlterEgo,
        };
        dispatch(addUser(newUser));
        setNewRealName('');
        setNewAlterEgo('');
      }}
    >
      <label htmlFor="new-user-real-name">
        Real Name
        <input
          id="new-user-real-name"
          type="text"
          value={newRealName}
          placeholder="Real Name"
          required
          onChange={(e) => setNewRealName(e.target.value)}
        />
      </label>
      <label htmlFor="new-user-alter-ego">
        Alter Ego
        <input
          id="new-user-alter-ego"
          type="text"
          value={newAlterEgo}
          placeholder="Alter Ego"
          required
          onChange={(e) => setNewAlterEgo(e.target.value)}
        />
      </label>

      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUser;
