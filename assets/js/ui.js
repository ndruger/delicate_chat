export function load(chan) {
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

function createXmlBody(body) {
  return  $('<div class="message-body message-body-xml">').text(body);
}

function createBody({type, body}) {
  switch(type) {
  case 'text':
    return createTextBody(body);
  case 'xml':
    return createXmlBody(body);
  }
}

export function showMessage({name, type, body}) {
  const $msg = $('<div class="message">');
  const $name = $('<div class="message-name">').text(name);
  const $body = createBody({type, body});
  $msg.append([$name, $body]);
  $('.message-list').append($msg);
  $('.message-list-container').scrollTop($('.message-list-container')[0].scrollHeight);
}
