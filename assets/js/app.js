import 'phoenix_html'
import {Socket} from 'phoenix'

$(() => {

  function showMessage({body}) {
    const $el = $('<div class="message-continer">');
    $el.text(body);
    $('.message-list').append($el);
    $('.message-list-container').scrollTop($('.message-list-container')[0].scrollHeight)
  }

  const socket = new Socket('/socket', {
    params: {token: window.userToken},
    logger: ((kind, msg, data) => {
      console.log(`${kind}: ${msg}`, data);
    })
  });

  socket.connect();
  const chan = socket.channel('room:chat', {});

  chan.join().receive('ok', () => {
    console.log('joined');
    // chan.push('reset', {});

    chan.on('new_msg', (msg) => {
      showMessage(msg)
    });

    // chan.on('processes', ({processes, atomMemory}: {processes: Array<Object>, atomMemory: number}) => {
    //   const atomMemoryPercent = atomMemory / 51658249 * 30;
    //   $('.atom-memory-bar').css({width: `${atomMemoryPercent}%`});
    //   const safeProcesses = _.map(processes, (process) => {
    //     return {
    //       ...process,
    //       id: Pid.toSafe(process.id),
    //       links: _.map(process.links, (id) => Pid.toSafe(id)),
    //     };
    //   });
    //   world.updateEnemies(safeProcesses);
    // });
  });

  console.log('neko')
  $('.operation-textarea').keyup((e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      chan.push('new:msg', {name: 'nobody', body: $('.operation-textarea').val()});
      $('.operation-textarea').val('');
      // $('.message-form').submit();
    }
  });
});
