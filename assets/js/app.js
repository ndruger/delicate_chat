import 'phoenix_html';
import {Socket} from 'phoenix';
import * as OperationBox from './view/operation_box';
import * as MessageList from './view/message_list';
import * as MetricsList from './view/metrics_list';

$(() => {

  const socket = new Socket('/socket', {
    params: {token: window.userToken},
    // logger: ((kind, msg, data) => {
    //   console.log(`${kind}: ${msg}`, data);
    // })
  });

  socket.connect();
  const chan = socket.channel('room:chat', {});

  OperationBox.load(chan);

  chan.join().receive('ok', () => {
    console.log('joined');

    chan.on('new_msg', (msg) => {
      MessageList.handleMsg(msg);
    });

    chan.on('system', (msg) => {
      MetricsList.handleMsg(msg);
    });
  });
});
