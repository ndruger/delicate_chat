import 'phoenix_html';
import {Socket} from 'phoenix';
import * as ui from './ui';

$(() => {

  const socket = new Socket('/socket', {
    params: {token: window.userToken},
    // logger: ((kind, msg, data) => {
    //   console.log(`${kind}: ${msg}`, data);
    // })
  });

  socket.connect();
  const chan = socket.channel('room:chat', {});

  ui.load(chan);

  chan.join().receive('ok', () => {
    console.log('joined');

    chan.on('new_msg', (msg) => {
      ui.showMessage(msg);
    });

    chan.on('system', (msg) => {
      ui.showSystemMessage(msg);
    });
  });
});
