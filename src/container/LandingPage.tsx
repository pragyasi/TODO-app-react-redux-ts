import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../actions/LandingPageActions';
import '../styles/LandingPage.scss';
interface props {
  history: {
    push: (path: string) => {};
  };
  params: {};
}

export default function LandingPage(props: props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState<string>('');
  const getTodoListPath = () => {
    props.history.push('/todoList');
  };

  const getUser = () => {
    const action = addUser(user);
    dispatch(action);
    getTodoListPath();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      getUser();
    }
  };
  return (
    <div className="landing-page-container">
      <h1>Create your TODOs here ....</h1>
      <input
        type="text"
        className="landing-page-input"
        placeholder="Name your Todo List"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      ></input>
      <button onClick={() => getUser()} className="landing-page-button">
        Start
      </button>
    </div>
  );
}
