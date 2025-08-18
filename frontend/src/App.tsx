import LogInSection from './Components/LogInSection';
import SignUpSection from './Components/SignUpSection';
import MessageInput from './Components/messageInput';
import Sidebar from './Components/sidebar';
import './css/App.css';
import { useAppSelector } from './states/Store';

import Messages from './Components/messages';
import StartSection from './Components/StartSection';
import useLogIn from './hooks/usegetMe';

export default function App() {
  const { loading: loading } = useLogIn();

  const isLogged = useAppSelector((state) => state.app.isLogged);

  return (
    <div className="App">
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
