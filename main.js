const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 400,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'customButtonsOnHover',
    // titleBarStyle: 'hidden',
    titleBarOverlay: true,
    autoHideMenuBar: true,
    frame: false,
  })

  const templete=[
    {
      label: 'edit',
      submenu:[
        {
          role:'reload'
        }
      ]
    }
  ];
  // let newMenu= Menu.buildFromTemplate(templete);

  // Menu.setApplicationMenu(newMenu);

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
