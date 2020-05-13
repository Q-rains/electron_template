const { ipcRenderer } = require('electron');

$(function () {
  $('.xxx-btn').on('click', () => {
    toastr.info('你点击了按钮');
    ipcRenderer.send('btn-click', 'btn clicked hahaha');
  });

  ipcRenderer.on('to-render', (e, arg) => {
    console.log('message from main-process');
    console.log(arg);
  });

  console.log($('Fragment'));
});
