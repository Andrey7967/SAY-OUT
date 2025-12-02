import { createSlice } from '@reduxjs/toolkit';

interface State {
  isProfile: boolean;
  isLogIn: boolean;
  isSignUp: boolean;
  isLogged: boolean;
  role: 'admin' | 'user';
  loggedNickname: string;
  loggedEmail: string;
  messages: Array<messageQuery>;
  userId: number;
  globalWebSocket: WebSocket | null;
  updateUsers: boolean;
  updateMessages: boolean;
  updateUserData: boolean;
}

const initialState: State = {
  isProfile: false,
  role: 'user',
  isLogIn: false,
  isSignUp: false,
  isLogged: false,
  loggedNickname: '',
  loggedEmail: '',
  messages: [],
  userId: -1,
  globalWebSocket: null,
  updateUsers: false,
  updateMessages: false,
  updateUserData: false,
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
    setIsProfile: (state, action) => {
      const { data } = action.payload;

      state.isProfile = data;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },

    toggleUpdateUsers: (state) => {
      state.updateUsers = !state.updateUsers;
    },

    toggleUpdateMessages: (state) => {
      state.updateMessages = !state.updateMessages;
    },
    toogleUpdateUserData: (state) => {
      state.updateUserData = !state.updateUserData;
    },
    setGlobalWebSocket: (state, action) => {
      state.globalWebSocket = action.payload;
    },
  },
});

export const {
  setIsProfile,
  setIsLogIn,
  setIsSignUp,
  setIsLogged,
  setLoggedNickname,
  setUserId,
  addMessages,
  setMessages,
  setGlobalWebSocket,
  setLoggedEmail,
  setRole,
  toggleUpdateMessages,
  toggleUpdateUsers,
  toogleUpdateUserData,
} = componentsSlice.actions;
export default componentsSlice.reducer;
