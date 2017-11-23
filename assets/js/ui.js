import {pd} from 'pretty-data';

export function load(chan) {
  // $('.operation-type').change(() => {
  //   debugger;
  // });

  $('.operation-textarea').keyup((e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      const msg = {
        name: 'nobody',
        type: $('.operation-type').val(),
        body: $('.operation-textarea').val(),
      };
      chan.push('new:msg', msg);
      $('.operation-textarea').val('');
    }
  });
}

function createTextBody(body) {
  return $('<div class="message-body message-body-text">').text(body);
}

console.log(pd.xml("<neko>neko</neko>"));

function createXmlBody(body) {
  return  $('<div class="message-body message-body-xml">').text(pd.xml(body));
}

function createBodyEl({type, body}) {
  switch(type) {
  case 'text':
    return createTextBody(body);
  case 'xml':
    return createXmlBody(body);
  }
}

export function showMessage({name, type, body}) {
  const $msg = $('<div class="message">');
  const $header = $('<div class="message-header">');
  const $name = $('<span class="message-name">').text(name);
  const $type = $('<span class="message-type">').text(type);
  $header.append([$name, $type]);
  const $body = createBodyEl({type, body});
  $msg.append([$header, $body]);
  $('.message-list').append($msg);
  $('.message-list-container').scrollTop($('.message-list-container')[0].scrollHeight);
}
