import { Folder } from "@/types";

export const FooterMessages = [
  {
    name: "Folder",
    message: "Creates a new folder.",
  },
  {
    name: "Shortcut",
    message: "Creates a shortcut to quickly access your files or applications.",
  },
  {
    name: "TextDocument",
    message: "Creates a new text document for your notes and simple writings.",
  },
  {
    name: "WordPadDocument",
    message: "Creates a new WordPad document for rich text editing.",
  },
  {
    name: "BitmapImage",
    message: "Creates a new bitmap image for your drawings and graphics.",
  },
  {
    name: "WaveSound",
    message: "Creates a new wave sound file for your audio recordings.",
  },
  {
    name: "CreateShortcut",
    message: "Creates shortcuts to the selected items.",
  },
  {
    name: "Delete",
    message: "Deletes the selected item.",
  },
  {
    name: "Rename",
    message: "Renames the selected item.",
  },
  {
    name: "Properties",
    message: "Displays the properties of the selected items.",
  },
  {
    name: "WorkOffline",
    message: "Shows Web pages without downloading them.",
  },
  {
    name: "Close",
    message: "Closes the current window.",
  },
  {
    name: "Undo",
    message: "Undo the last action.",
  },
  {
    name: "CutCtrl+X",
    message: "Removes the selected items and copies them onto the Clipboard.",
  },
  {
    name: "CopyCtrl+C",
    message:
      "Copies the selected items to the Clipboard. To put them in the new location, use the Paste command.",
  },
  {
    name: "PasteCtrl+V",
    message:
      "Inserts the items you have copied or cut into the selected location.",
  },
  {
    name: "PasteShortcut",
    message:
      "Creates shortcuts to the items you have copied or cut into the selected location.",
  },
  {
    name: "SelectAllCtrl+A",
    message: "Select all items in window.",
  },
  {
    name: "InvertSelection",
    message: "Reverses which items are selected and which are not.",
  },
  {
    name: "StandardButtons",
    message: "Displays the Standard Buttons toolbar.",
  },
  {
    name: "AddressBar",
    message: "Displays the Address bar.",
  },
  {
    name: "Links",
    message: "Displays the Quick Links bar.",
  },
  {
    name: "Radio",
    message: "Displays the Radio bar.",
  },
  {
    name: "TextLabels",
    message: "Adds a text label under each toolbar button.",
  },
  {
    name: "StatusBar",
    message: "Shows or hides the status bar.",
  },
  {
    name: "SearchCtrl+E",
    message: "Shows the Search bar.",
  },
  {
    name: "FavoritesCtrl+I",
    message: "Shows the Favorites bar.",
  },
  {
    name: "HistoryCtrl+H",
    message: "Shows the History bar.",
  },
  {
    name: "Folders",
    message: "Shows the Folders bar.",
  },
  {
    name: "TipoftheDay",
    message: "Shows a tip about the system.",
  },
  {
    name: "asWebPage",
    message: "Displays items in Web View.",
  },
  {
    name: "LargeIcons",
    message: "Displays items by using large icons.",
  },
  {
    name: "SmallIcons",
    message: "Displays items by using small icons.",
  },
  {
    name: "List",
    message: "Displays items in a list.",
  },
  {
    name: "Details",
    message: "Displays information about each item in the window.",
  },
  {
    name: "byName",
    message: "Sorts items alphabetically by name.",
  },
  {
    name: "byType",
    message: "Sorts items by type.",
  },
  {
    name: "bySize",
    message: "Sorts items by size, from smallest to largest.",
  },
  {
    name: "byDate",
    message: "Sorts items by date, from oldest to most recent.",
  },
  {
    name: "AutoArrange",
    message: "Arranges the icons automatically.",
  },
  {
    name: "LineUpIcons",
    message: "Arranges icons in a grid.",
  },
  {
    name: "RefreshF5",
    message: "Refreshes the content of current page.",
  },
  {
    name: "FolderOptions...",
    message: "Enables you to change settings.",
  },
  {
    name: "BackAlt+LeftArrow",
    message: "Goes to the previous page.",
  },
  {
    name: "ForwardAlt+RightArrow",
    message: "Goes to the next page.",
  },
  {
    name: "UpOneLevel",
    message: "Goes up one level.",
  },
  {
    name: "HomePageAlt+Home",
    message: "Goes to your home page.",
  },
  {
    name: "ChannelGuide",
    message: "Opens the Channel Guide page.",
  },
  {
    name: "SearchtheWeb",
    message: "Opens Internet Explorer.",
  },
  {
    name: "MyComputer",
    message: "Opens My Computer.",
  },
  {
    name: "InternetCall",
    message: "Opens your Internet call and meeting program.",
  },
  {
    name: "AddtoFavorites...",
    message: "Adds the current page to your Favorites list.",
  },
  {
    name: "OrganizeFavorites...",
    message: "Opens the Favorites folder.",
  },
  {
    name: "(empty)",
    message: "I'm just an empty space.",
  },
  {
    name: "FilesorFolders...",
    message: "Searches for Files or Folders.",
  },
  {
    name: "Computer...",
    message: "Searches on Computer settings.",
  },
  {
    name: "OntheInternet...",
    message: "Searches on the Internet.",
  },
  {
    name: "MapNetworkDrive...",
    message: "Connects to a network drive.",
  },
  {
    name: "DisconnectNetworkDrive...",
    message: "Disconnects from a network drive.",
  },
  {
    name: "Synchronize...",
    message: "Updates all offline content.",
  },
  {
    name: "HelpTopics",
    message: "Opens Help.",
  },
  {
    name: "About98.portfolio",
    message: "Opens the 98.portfolio document.",
  },
];

export const folders: Folder[] = [
  {
    id: 1,
    name: "Recycle Bin",
    isOpen: false,
    image: "/recycle-bin.png",
    isDocument: false,
    documentType: null,
    documentPath: null,
  },
  {
    id: 2,
    name: "My Computer",
    isOpen: false,
    image: "/computer-explorer.png",
    isDocument: false,
    documentType: null,
    documentPath: null,
  },
  {
    id: 3,
    name: "Backend",
    isOpen: false,
    image: "/folder.png",
    isDocument: false,
    documentType: null,
    documentPath: null,
  },
  {
    id: 4,
    name: "Frontend",
    isOpen: false,
    image: "/folder.png",
    isDocument: false,
    documentType: null,
    documentPath: null,
  },
  {
    id: 5,
    name: "Mobile",
    isOpen: false,
    image: "/folder.png",
    isDocument: false,
    documentType: null,
    documentPath: null,
  },
  {
    id: 6,
    name: "My Resume",
    isOpen: false,
    image: "/file.png",
    isDocument: true,
    documentType: "pdf",
    documentPath: "./englishCV.pdf",
  },
  {
    id: 7,
    name: "98.portfolio",
    isOpen: false,
    image: "/help-book.png",
    isDocument: true,
    documentType: "markdown",
    documentPath: "/AlexandreDresch/98.portfolio",
  },
  {
    id: 8,
    name: "Contact me",
    isOpen: false,
    image: "/modem.png",
    isDocument: false,
    documentType: null,
    documentPath: null,
  },
];

export const programs = [
  {
    id: 1,
    name: "VS Code",
    isOpen: false,
    icon: "/vs-code.png",
  },
  {
    id: 2,
    name: "Internet Explorer",
    isOpen: false,
    icon: "/internet-explorer.png",
  },
  {
    id: 3,
    name: "Image Viewer",
    isOpen: false,
    icon: "/image-viewer.png",
  },
];

export const folderNavigationMenuItems = {
  file: [
    {
      label: "New",
      items: [
        { label: "Folder", disabled: true },
        { label: "Shortcut", disabled: true },
        { label: "Text Document", disabled: true },
        { label: "WordPad Document", disabled: true },
        { label: "Bitmap Image", disabled: true },
        { label: "Wave Sound", disabled: true },
      ],
    },
    { label: "Create Shortcut", disabled: true },
    { label: "Delete" },
    { label: "Rename" },
    { label: "Properties", disabled: true },
    { label: "Work Offline" },
    { label: "Close" },
  ],
  edit: [
    { label: "Undo", disabled: true },
    { label: "Cut", disabled: true, shortcut: "Ctrl+X" },
    { label: "Copy", disabled: true, shortcut: "Ctrl+C" },
    { label: "Paste", disabled: true, shortcut: "Ctrl+V" },
    { label: "Paste Shortcut", disabled: true },
    { label: "Select All", shortcut: "Ctrl+A" },
    { label: "Invert Selection" },
  ],
  view: [
    {
      label: "Toolbars",
      items: [
        { label: "Standard Buttons" },
        { label: "Address Bar" },
        { label: "Links", disabled: true },
        { label: "Radio", disabled: true },
        { label: "Text Labels" },
      ],
    },
    { label: "Status Bar" },
    {
      label: "Explorer Bar",
      items: [
        { label: "Search", disabled: true, shortcut: "Ctrl+E" },
        { label: "Favorites", disabled: true, shortcut: "Ctrl+I" },
        { label: "History", disabled: true, shortcut: "Ctrl+H" },
        { label: "Folders", disabled: true },
        { label: "Tip of the Day", disabled: true },
      ],
    },
    { label: "as Web Page" },
    { label: "Large Icons" },
    { label: "Small Icons" },
    { label: "List" },
    { label: "Details", disabled: true },
    {
      label: "Arrange Icons",
      items: [
        { label: "by Name" },
        { label: "by Type" },
        { label: "by Size" },
        { label: "by Date" },
        { label: "Auto Arrange", disabled: true },
      ],
    },
    { label: "Line Up Icons", disabled: true },
    { label: "Refresh", shortcut: "F5" },
    { label: "Folder Options...", disabled: true },
  ],
  go: [
    { label: "Back", disabled: true, shortcut: "Alt+Left Arrow" },
    { label: "Forward", disabled: true, shortcut: "Alt+Right Arrow" },
    { label: "Home Page", disabled: true, shortcut: "Alt+Home" },
    { label: "Search", disabled: true, shortcut: "Ctrl+E" },
    { label: "Favorites", disabled: true, shortcut: "Ctrl+I" },
    { label: "History", disabled: true, shortcut: "Ctrl+H" },
    { label: "Folders", disabled: true },
    { label: "Tip of the Day", disabled: true },
  ],
};

export const vscodeNavigationMenuItems = {
  file: [
    { label: "New File", shortcut: "Ctrl+N" },
    { label: "New Folder", shortcut: "Ctrl+Shift+N" },
    { label: "Open File...", shortcut: "Ctrl+O" },
    { label: "Open Folder...", shortcut: "Ctrl+K Ctrl+O" },
    { label: "Save", shortcut: "Ctrl+S" },
    { label: "Save As...", shortcut: "Ctrl+Shift+S" },
    { label: "Close Editor", shortcut: "Ctrl+W" },
    { label: "Exit", shortcut: "Alt+F4" },
  ],
  edit: [
    { label: "Undo", shortcut: "Ctrl+Z" },
    { label: "Redo", shortcut: "Ctrl+Y" },
    { label: "Cut", shortcut: "Ctrl+X" },
    { label: "Copy", shortcut: "Ctrl+C" },
    { label: "Paste", shortcut: "Ctrl+V" },
    { label: "Find", shortcut: "Ctrl+F" },
    { label: "Replace", shortcut: "Ctrl+H" },
    { label: "Select All", shortcut: "Ctrl+A" },
    { label: "Format Document", shortcut: "Alt+Shift+F" },
  ],
  selection: [
    { label: "Select All", shortcut: "Ctrl+A" },
    { label: "Select Line", shortcut: "Ctrl+L" },
    { label: "Expand Selection", shortcut: "Ctrl+Shift+Right Arrow" },
    { label: "Shrink Selection", shortcut: "Ctrl+Shift+Left Arrow" },
    { label: "Select to Bracket", shortcut: "Ctrl+Shift+M" },
  ],
  view: [
    { label: "Explorer", shortcut: "Ctrl+Shift+E" },
    { label: "Search", shortcut: "Ctrl+Shift+F" },
    { label: "Source Control", shortcut: "Ctrl+Shift+G" },
    { label: "Run", shortcut: "Ctrl+Shift+D" },
    { label: "Extensions", shortcut: "Ctrl+Shift+X" },
    { label: "Show All Symbols", shortcut: "Ctrl+T" },
    { label: "Command Palette...", shortcut: "Ctrl+Shift+P" },
  ],
  go: [
    { label: "Go to File...", shortcut: "Ctrl+P" },
    { label: "Go to Symbol...", shortcut: "Ctrl+Shift+O" },
    { label: "Go to Definition", shortcut: "F12" },
    { label: "Go to Implementation", shortcut: "Ctrl+F12" },
    { label: "Go to References", shortcut: "Shift+F12" },
  ],
  run: [
    { label: "Start Debugging", shortcut: "F5" },
    { label: "Run Without Debugging", shortcut: "Ctrl+F5" },
    { label: "Stop Debugging", shortcut: "Shift+F5" },
    { label: "Restart Debugging", shortcut: "Ctrl+Shift+F5" },
    { label: "Open Run and Debug", shortcut: "Ctrl+Shift+D" },
  ],
  terminal: [
    { label: "New Terminal", shortcut: "Ctrl+`" },
    { label: "Split Terminal", shortcut: "Ctrl+Shift+5" },
    { label: "Run Active File", shortcut: "Ctrl+F5" },
    { label: "Kill Terminal", shortcut: "Ctrl+Shift+X" },
    { label: "Toggle Integrated Terminal", shortcut: "Ctrl+`" },
  ],
  help: [
    { label: "Welcome", shortcut: "" },
    { label: "Show All Commands", shortcut: "Ctrl+Shift+P" },
    { label: "Documentation", shortcut: "" },
    { label: "Editor Playground", shortcut: "" },
    { label: "Show Release Notes", shortcut: "" },
    { label: "Keyboard Shortcuts Reference [Ctrl+K Ctrl+R]", shortcut: "" },
    { label: "Video Tutorials", shortcut: "" },
    { label: "Tips and Tricks", shortcut: "" },
    { label: "Join Us on Youtube", shortcut: "" },
    { label: "Search Feature Request", shortcut: "" },
    { label: "Report Issue", shortcut: "" },
    { label: "View License", shortcut: "" },
    { label: "Privacy Statement", shortcut: "" },
    { label: "Toggle Developer Tools", shortcut: "" },
    { label: "Open Process Explorer", shortcut: "" },
    { label: "Check for Updates...", shortcut: "" },
    { label: "About", shortcut: "" },
  ],
};
