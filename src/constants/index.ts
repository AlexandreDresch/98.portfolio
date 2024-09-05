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
    { label: "Command Palette...", shortcut: "Ctrl+Shift+P" },
    { label: "Open View..." },
    {
      label: "Appearance",
      items: [
        { label: "Fullscreen", shortcut: "F11" },
        { label: "Zen Mode [Ctrl+K Z]" },
        { label: "Centered Layout" },
        { label: "Menu Bar" },
        { label: "Primary Side Bar", shortcut: "Ctrl+B" },
        { label: "Secondary Side Bar", shortcut: "Alt+Ctrl+B" },
        { label: "Status Bar" },
        { label: "Panel", shortcut: "Ctrl+J" },
        { label: "Custom Title Bar" },
        { label: "Move Primary Side Bar Right" },
        {
          label: "Active Bar Position",
          items: [
            { label: "Default" },
            { label: "Top" },
            { label: "Bottom" },
            { label: "Hidden" },
          ],
        },
        {
          label: "Panel Position",
          items: [
            { label: "Top" },
            { label: "Left" },
            { label: "Right" },
            { label: "Bottom" },
          ],
        },
        {
          label: "Align Panel",
          items: [
            { label: "Center" },
            { label: "Justify" },
            { label: "Left" },
            { label: "Right" },
          ],
        },
        {
          label: "Tab Bar",
          items: [
            { label: "Multiple Tabs" },
            { label: "Single Tab" },
            { label: "Hidden" },
          ],
        },
        {
          label: "Editor Actions Position",
          items: [
            { label: "Tab Bar" },
            { label: "Title Bar" },
            { label: "Hidden" },
          ],
        },
        { label: "Minimap" },
        { label: "Toggle Breadcrumbs" },
        { label: "Sticky Scroll" },
        { label: "Render Whitespace" },
        { label: "Render Control Characters" },
        { label: "Zoom In [Ctrl+=]" },
        { label: "Zoom Out [Ctrl+-]" },
        { label: "Reset Zoom [Ctrl+Numpad0]" },
      ],
    },
    {
      label: "Editor Layout",
      items: [
        { label: "Split Up [Ctrl+K Ctrl+]" },
        { label: "Split Down" },
        { label: "Split Left" },
        { label: "Split Right" },
        { label: "Split in Group [Ctrl+K Ctrl+Shift+]" },
        { label: "Move Editor into New Window" },
        { label: "Copy Editor into New Window [Ctrl+K O]" },
        { label: "Single" },
        { label: "Two Columns" },
        { label: "Three Columns" },
        { label: "Two Rows" },
        { label: "Three Rows" },
        { label: "Grid (2x2)" },
        { label: "Two Rows Right" },
        { label: "Two Columns Bottom" },
        { label: "Flip Layout", shortcut: "Alt+Shift+0" },
      ],
    },
  ],
  go: [
    { label: "Back" },
    { label: "Forward [Ctrl+Shift+-]", disabled: true },
    { label: "Last Edit Location [Ctrl+K Ctrl+Q]" },
    {
      label: "Switch Editor",
      items: [
        { label: "Next Editor", shortcut: "Ctrl+Page Down" },
        { label: "Previous Editor", shortcut: "Ctrl+Page Up" },
        { label: "Next Used Editor" },
        { label: "Previous Used Editor" },
        { label: "Next Editor in Group [Ctrl+K Ctrl+PageDown]" },
        { label: "Previous Editor in Group [Ctrl+K Ctrl+PageUp]" },
        { label: "Next Used Editor in Group" },
        { label: "Previous Used Editor in Group" },
      ],
    },
    {
      label: "Switch Group",
      items: [
        { label: "Group 1", shortcut: "Ctrl+1" },
        { label: "Group 2", shortcut: "Ctrl+2" },
        { label: "Group 3", shortcut: "Ctrl+3", disabled: true },
        { label: "Group 4", shortcut: "Ctrl+4", disabled: true },
        { label: "Group 5", shortcut: "Ctrl+5", disabled: true },
        { label: "Next Group", disabled: true },
        { label: "Previous Group", disabled: true },
        { label: "Group Left [Ctrl+K Ctrl+LeftArrow]", disabled: true },
        { label: "Group Right [Ctrl+K Ctrl+RightArrow]", disabled: true },
        { label: "Group Above [Ctrl+K Ctrl+UpArrow]", disabled: true },
        { label: "Group Bellow [Ctrl+K Ctrl+DownArrow]", disabled: true },
      ],
    },
    { label: "Go to File...", shortcut: "Ctrl+P" },
    { label: "Go to Symbol in Workspace...", shortcut: "Ctrl+T" },
    { label: "Go to Definition", shortcut: "F12" },
    { label: "Go to Declaration" },
    { label: "Go to Type Definition" },
    { label: "Go to Implementations", shortcut: "Ctrl+F12" },
    { label: "Go to References", shortcut: "Shift+F12" },
    { label: "Go to Line/Column...", shortcut: "Ctrl+G" },
    { label: "Go to Bracket [Ctrl+Shift+]" },
    { label: "Next Problem", shortcut: "F8" },
    { label: "Previous Problem", shortcut: "Shift+F8" },
    { label: "Next Change", shortcut: "Alt+F3" },
    { label: "Previous Change", shortcut: "Alt+Shift+F3" },
  ],
  run: [
    { label: "Start Debugging", shortcut: "F5" },
    { label: "Run Without Debugging", shortcut: "Ctrl+F5" },
    { label: "Stop Debugging", shortcut: "Shift+F5" },
    { label: "Restart Debugging", shortcut: "Ctrl+Shift+F5" },
    { label: "Open Configurations", shortcut: "" },
    { label: "Add Configuration...", shortcut: "" },
    { label: "Step Over", shortcut: "F10" },
    { label: "Step Into", shortcut: "F11" },
    { label: "Step Out", shortcut: "Shift+F11" },
    { label: "Continue", shortcut: "F5" },
    { label: "Toggle Breakpoint", shortcut: "F9" },
    {
      label: "New Breakpoint",
      items: [
        { label: "Conditional Breakpoint..." },
        { label: "Edit Breakpoint" },
        { label: "Inline Breakpoint", shortcut: "Shift+F9" },
        { label: "Function Breakpoint" },
        { label: "Logpoint..." },
        { label: "Triggered Breakpoint..." },
      ],
    },
    { label: "Enable All Breakpoints" },
    { label: "Disable All Breakpoints" },
    { label: "Remove All Breakpoints" },
    { label: "Install Additional Debuggers..." },
  ],
  terminal: [
    { label: "New Terminal", shortcut: "" },
    { label: "Split Terminal", shortcut: "Ctrl+Shift+5" },
    { label: "Run Task...", shortcut: "" },
    { label: "Run Build Task...", shortcut: "Ctrl+Shift+B" },
    { label: "Run Active File", shortcut: "" },
    { label: "Run Selected Text", shortcut: "" },
    { label: "Show Running Tasks...", disabled: true, shortcut: "" },
    { label: "Restart Running Task...", disabled: true, shortcut: "" },
    { label: "Terminate Task...", disabled: true, shortcut: "" },
    { label: "Configure Tasks...", shortcut: "" },
    { label: "Configure Default Build Task...", shortcut: "" },
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
