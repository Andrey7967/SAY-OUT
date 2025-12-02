import LogInSection from './Components/LogInSection';
import SignUpSection from './Components/SignUpSection';
import MessageInput from './Components/messageInput';
import Sidebar from './Components/Sidebar';
import './css/App.css';
import { useAppSelector } from './states/Store';

import Messages from './Components/messages';
import StartSection from './Components/StartSection';
import useLogIn from './hooks/usegetMe';
import Profile from './Components/Profile';

export default function App() {
  const { loading: loading } = useLogIn();
  const isProfile = useAppSelector((state) => state.app.isProfile);
  const isLogged = useAppSelector((state) => state.app.isLogged);

  return (
    <div className="App">
      <Profile />
      <SignUpSection />
      <LogInSection />
      <Sidebar />

      {loading ? null : !isLogged ? (
        <StartSection />
      ) : (
        <div className="conversationContainer">
          <Messages />
          <MessageInput />
        </div>
      )}
    </div>
  );
}
