const { app, BrowserWindow, ipcMain } = require('electron')

let createWindow = () => {
  win = new BrowserWindow({
     kiosk: true
  })

  win.loadFile('GUI/index.html');

  win.on('closed', () => {
    win = null;
  })

  //we don't want the menu to pop up
  win.setMenu(null)

  ipcMain.on('shut-down', () => {
    app.quit()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if(win == null)
    createWindow()
})
