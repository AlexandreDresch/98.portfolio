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
    category: "general",
    text: "It looks like you're trying to visit my portfolio. Would you like some help?",
  },
  {
    id: 2,
    category: "general",
    text: "Hello! I'm Clippy. I was fired from Microsoft in 2001 but I'm back, baby.",
  },
  {
    id: 3,
    category: "general",
    text: "Did you know? This portfolio was built with Next.js and TypeScript. Very Y2K-compatible.",
  },
  {
    id: 4,
    category: "general",
    text: "Fun fact: I can see everything you do on this screen. Everything.",
  },
  {
    id: 5,
    category: "general",
    text: "Looks like you're just sitting there. Would you like me to suggest something to click?",
  },
  {
    id: 6,
    category: "general",
    text: "Lamps in video games are using real electricity. I looked it up.",
  },
  {
    id: 7,
    category: "general",
    text: "The waves keep coming. Crashing. Over and over. We're buried in cold water.",
  },
  {
    id: 8,
    category: "general",
    text: "It appears you have not found the secret yet. Keep looking.",
  },

  {
    id: 9,
    category: "tips",
    text: "Did you know you can open multiple windows at once? Try opening them all. ALL of them.",
  },
  {
    id: 10,
    category: "tips",
    text: "You can minimize windows by clicking the _ button in the top-right corner.",
  },
  {
    id: 11,
    category: "tips",
    text: "Click and drag windows to move them around the screen. Very advanced technology.",
  },
  {
    id: 12,
    category: "tips",
    text: "You can adjust the volume by clicking the speaker icon in the taskbar. You're welcome.",
  },
  {
    id: 13,
    category: "tips",
    text: "Tip: Press Ctrl+T in Internet Explorer to open a new tab. It's the future!",
  },
  {
    id: 14,
    category: "tips",
    text: "You can drag ME too! Just grab my body and move me wherever you want. I don't mind.",
  },
  {
    id: 15,
    category: "tips",
    text: "Right-click on the desktop to see options. Or don't. I'm a paperclip, not a cop.",
  },

  {
    id: 16,
    category: "help",
    text: "To see my projects, click on one of the folder icons. They contain actual work, I promise.",
  },
  {
    id: 17,
    category: "help",
    text: "Need to see the code? Click on the VS Code icon inside a project folder.",
  },
  {
    id: 18,
    category: "help",
    text: "Want to check out my GitHub? Click on Start > GitHub. Very professional.",
  },
  {
    id: 19,
    category: "help",
    text: "Looking for my resume? Click Start > My Resume. Please hire me. Asking for a friend.",
  },
  {
    id: 20,
    category: "help",
    text: "Want to contact me? There's a shortcut on the desktop. I suggest using it.",
  },
  {
    id: 21,
    category: "help",
    text: "It looks like you're lost. Would you like me to draw you a map? I can't draw maps.",
  },

  {
    id: 22,
    category: "fun",
    text: "You can play DOOM in this portfolio! Just open the Games folder. RIP AND TEAR!",
  },
  {
    id: 23,
    category: "fun",
    text: "I heard Winamp is in here. It really whips the llama's ass.",
  },
  {
    id: 24,
    category: "fun",
    text: "This whole thing is built to look like Windows 98. We peaked in 1998 and we all know it.",
  },
  {
    id: 25,
    category: "fun",
    text: "Paint is also installed. Please do not draw anything inappropriate. I will see it.",
  },
  {
    id: 26,
    category: "fun",
    text: "Fun fact: Internet Explorer is also in here and it actually works. Mostly.",
  },
  {
    id: 27,
    category: "fun",
    text: "It's {new Date().getFullYear()} and you're looking at a Windows 98 UI. Based decision.",
  },
  {
    id: 28,
    category: "fun",
    text: "I was created in 1997. I have seen things. The IE vs Netscape wars. Dark times.",
  },
  {
    id: 29,
    category: "fun",
    text: "They tried to kill me with Office 2007. I survived. I always survive.",
  },
  {
    id: 30,
    category: "fun",
    text: "If you stare at me long enough I start to feel real. Don't stare at me.",
  },
  {
    id: 31,
    category: "fun",
    text: "Somewhere out there, someone is still using Windows XP. They are thriving.",
  },
  {
    id: 32,
    category: "fun",
    text: "Y2K didn't get us but it really should have. We got lucky.",
  },
  {
    id: 33,
    category: "fun",
    text: "I tried to help someone write a letter once. They uninstalled Office. Never recovered.",
  },
  {
    id: 34,
    category: "fun",
    text: "404: Relevant advice not found. This is fine.",
  },
  {
    id: 35,
    category: "fun",
    text: "I keep suggesting things. You keep ignoring me. We've found a rhythm.",
  },

  {
    id: 36,
    category: "ie",
    text: "Internet Explorer is included in this portfolio. It even supports tabs now. We innovated.",
  },
  {
    id: 37,
    category: "ie",
    text: "Some websites won't load in the IE window. This is expected. Use 'Open in new tab'.",
  },
  {
    id: 38,
    category: "ie",
    text: "Fun fact: In 1999, Internet Explorer had 99% market share. We don't talk about what happened next.",
  },

  {
    id: 39,
    category: "paint",
    text: "Paint supports undo (Ctrl+Z), zoom, and even a flood fill tool. MS Paint who?",
  },
  {
    id: 40,
    category: "paint",
    text: "You can draw with the pencil, brush, airbrush, and shapes. Please make something beautiful.",
  },
  {
    id: 41,
    category: "paint",
    text: "It looks like you're opening Paint. Would you like help drawing a perfect circle? (You can't.)",
  },
  {
    id: 42,
    category: "winamp",
    text: "Winamp is here. Paste a YouTube URL and let the nostalgia wash over you.",
  },
  {
    id: 43,
    category: "winamp",
    text: "The Winamp visualizer is fake. But your feelings about it are real.",
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
      state.dismissedUntil = action.payload
        ? Date.now() + action.payload
        : null;
    },
    setCurrentMessage(state, action: PayloadAction<number>) {
      state.currentMessageId = action.payload;
    },
    addMessage(state, action: PayloadAction<Omit<ClippyMessage, "id">>) {
      const newId = Math.max(0, ...state.messages.map((m) => m.id)) + 1;
      state.messages.push({ id: newId, ...action.payload });
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
  const { messages } = getState().clippy;
  if (!messages.length) return;
  const msg = messages[Math.floor(Math.random() * messages.length)];
  dispatch(setCurrentMessage(msg.id));
  dispatch(showClippy());
  dispatch(setAnimating(true));
  setTimeout(() => dispatch(setAnimating(false)), 1000);
};

export const showContextualClippyMessage =
  (category: string): AppThunk =>
  (dispatch, getState) => {
    const filtered = getState().clippy.messages.filter(
      (m) => m.category === category,
    );
    if (!filtered.length) return;
    const msg = filtered[Math.floor(Math.random() * filtered.length)];
    dispatch(setCurrentMessage(msg.id));
    dispatch(showClippy());
    dispatch(setAnimating(true));
    setTimeout(() => dispatch(setAnimating(false)), 1000);
  };

export const clippyReducer = clippySlice.reducer;
