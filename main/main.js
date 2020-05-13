const path = require('path');
const url = require('url');
const fs = require('fs');
const { app, BrowserWindow, ipcMain } = require('electron');
const setApplicationMenu = require('./utils/menu');
const { NODE_ENV } = process.env;

let mainWindow = null;

// const preloadPath = path.join(__dirname, '../dist/renderer/window_node_api.js');
const MAIN_WINDOW_CONFIG = {
  height: 720,
  width: 1280,
  webPreferences: {
    nodeIntegration: true,
    // preload: fs.existsSync(preloadPath) ? preloadPath : null,
  },
};

function createWindow() {
  mainWindow = new BrowserWindow(MAIN_WINDOW_CONFIG);
  setApplicationMenu();

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '../renderer/index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );

  if (NODE_ENV === 'development') {
    // 打开调试工具
    mainWindow.webContents.openDevTools();
  }


  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();

  ipcMain.on('btn-click', (event, data) => {
    console.log('btn-click-data-from-render: ', data);
    mainWindow.send('to-render', 'btn-clicked received in main');
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
