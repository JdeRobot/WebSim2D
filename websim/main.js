const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
global.sharedObject = process.argv
server = global.sharedObject[2];

// Get document, or throw exception on error

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
var html = "";
var width = 0;
var height = 0;
if (server == "/ice") {
	html = "iceinterface.html";
        width = 900;
        height = 600;
} else if (server == "/ros") {
	html = "rosinterface.html";
        width = 900;
        height = 600;
} else if (server == "/"){
	html = "index.html"
        width = 1800;
        height = 1080;
} else {
	html = "error.html";
        width = 1800;
        height = 1080;
}

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: width, height: height});
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, html),
    protocol: 'file:',
    slashes: true
  }));


  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
