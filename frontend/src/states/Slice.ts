import { createSlice } from '@reduxjs/toolkit';

interface State {
  isLogIn: boolean;
  isSignUp: boolean;
  isLogged: boolean;
  loggedNickname: string;
  loggedEmail: string;
  messages: Array<messageQuery>;
  userId: number;
  globalWebSocket: WebSocket | null;
}

const initialState: State = {
  isLogIn: false,
  isSignUp: false,
  isLogged: false,
  loggedNickname: '',
  loggedEmail: '',
  messages: [],
  userId: -1,
  globalWebSocket: null,
};

const componentsSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLogIn: (state, action) => {
      const { data } = action.payload;

      state.isLogIn = data;
    },
    setIsSignUp: (state, action) => {
      const { data } = action.payload;

      state.isSignUp = data;
    },
    setIsLogged: (state, action) => {
      const { data } = action.payload;

      state.isLogged = data;
    },
    setLoggedNickname: (state, action) => {
      const { data } = action.payload;

      state.loggedNickname = data;
    },
    setLoggedEmail: (state, action) => {
      const { data } = action.payload;

      state.loggedEmail = data;
    },
    setUserId: (state, action) => {
      const { data } = action.payload;

      state.userId = data;
    },
    addMessages: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setGlobalWebSocket: (state, action) => {
      state.globalWebSocket = action.payload;
    },
  },
});

export const {
  setIsLogIn,
  setIsSignUp,
  setIsLogged,
  setLoggedNickname,
  setUserId,
  addMessages,
  setMessages,
  setGlobalWebSocket,
  setLoggedEmail,
} = componentsSlice.actions;
export default componentsSlice.reducer;
