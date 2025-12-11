import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk } from "./store";

interface ClippyMessage {
  id: number;
  text: string;
  category: string;
}

interface ClippyState {
  isVisible: boolean;
  currentMessageId: number | null;
  messages: ClippyMessage[];
  dismissedUntil: number | null;
  isAnimating: boolean;
}

const initialMessages: ClippyMessage[] = [
  {
    id: 1,
    text: "It looks like you're trying to visit my portfolio. Would you like some help?",
    category: "general",
  },
  {
    id: 2,
    text: "Did you know you can open multiple windows at once? Try it!",
    category: "tips",
  },
  {
    id: 3,
    text: "To see my projects, click on one of the folder icons.",
    category: "help",
  },
  {
    id: 4,
    text: "You can minimize windows by clicking the minimize button in the top-right corner.",
    category: "tips",
  },
  {
    id: 5,
    text: "Need to see the code? Click on the VS Code icon inside a project folder.",
    category: "help",
  },
  {
    id: 6,
    text: "Want to check out my GitHub? Click on Start > GitHub.",
    category: "tips",
  },
  {
    id: 7,
    text: "You can adjust the volume by clicking the speaker icon in the taskbar.",
    category: "tips",
  },
  {
    id: 8,
    text: "Click and drag windows to move them around the screen.",
    category: "tips",
  },
  {
    id: 9,
    text: "Looking for my resume? Click Start > My Resume.",
    category: "help",
  },
  {
    id: 10,
    text: "Want to contact me? Check out the Contact Me shortcut in the desktop.",
    category: "help",
  },
  {
    id: 11,
    text: "You can play a game of DOOM by opening the Games folder and clicking on the DOOM icon.",
    category: "fun",
  },
  {
    id: 12,
    text: "Did you know? Lamps in video games are using real electricity.",
    category: "general",
  },
  {
    id: 13,
    text: "The waves keep coming. Crashing. Over and over. We're buried in cold water.",
    category: "fun",
  },
];

const initialState: ClippyState = {
  isVisible: true,
  currentMessageId: null,
  messages: initialMessages,
  dismissedUntil: null,
  isAnimating: false,
};

const clippySlice = createSlice({
  name: "clippy",
  initialState,
  reducers: {
    showClippy(state) {
      if (!state.dismissedUntil || Date.now() > state.dismissedUntil) {
        state.isVisible = true;
      }
    },
    hideClippy(state) {
      state.isVisible = false;
    },
    dismissClippy(state, action: PayloadAction<number | null>) {
      state.isVisible = false;
      if (action.payload) {
        state.dismissedUntil = Date.now() + action.payload;
      } else {
        state.dismissedUntil = null;
      }
    },
    setCurrentMessage(state, action: PayloadAction<number>) {
      state.currentMessageId = action.payload;
    },
    addMessage(state, action: PayloadAction<Omit<ClippyMessage, "id">>) {
      const newId = Math.max(0, ...state.messages.map((m) => m.id)) + 1;
      state.messages.push({
        id: newId,
        ...action.payload,
      });
    },
    setAnimating(state, action: PayloadAction<boolean>) {
      state.isAnimating = action.payload;
    },
  },
});

export const {
  showClippy,
  hideClippy,
  dismissClippy,
  setCurrentMessage,
  addMessage,
  setAnimating,
} = clippySlice.actions;

export const showRandomClippyMessage = (): AppThunk => (dispatch, getState) => {
  const state = getState();
  const messages = state.clippy.messages;

  if (messages.length > 0) {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const messageId = messages[randomIndex].id;

    dispatch(setCurrentMessage(messageId));
    dispatch(showClippy());

    dispatch(setAnimating(true));
    setTimeout(() => {
      dispatch(setAnimating(false));
    }, 1000);
  }
};

export const showContextualClippyMessage =
  (category: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const filteredMessages = state.clippy.messages.filter(
      (m) => m.category === category
    );

    if (filteredMessages.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredMessages.length);
      const messageId = filteredMessages[randomIndex].id;

      dispatch(setCurrentMessage(messageId));
      dispatch(showClippy());

      dispatch(setAnimating(true));
      setTimeout(() => {
        dispatch(setAnimating(false));
      }, 1000);
    }
  };

export const clippyReducer = clippySlice.reducer;
