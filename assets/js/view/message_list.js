import {pd as PrettyData} from 'pretty-data';

const messageMax = 20;

function createTextBody(body) {
  return $('<div class="message-body message-body-text">').text(body);
}

function createXmlBody(body) {
  const prettyed = PrettyData.xml(body);
  return  $('<div class="message-body message-body-xml">').text(prettyed);
}

function createBodyEl({type, body}) {
  switch(type) {
  case 'text':
    return createTextBody(body);
  case 'xml':
    return createXmlBody(body);
  }
}

function createMsgEl({name, type, body}) {
  const $msg = $('<div class="message">');
  const $header = $('<div class="message-header">');
  const $name = $('<span class="message-name">')
    .text(name)
    .toggleClass('message-name-system', name === 'system');
  const $type = $('<span class="message-type">').text(type);
  $header.append([$name, $type]);
  const $body = createBodyEl({type, body});
  $msg.append([$header, $body]);
  return $msg;
}

function clearOveredMsg() {
  const $allMessages = $('.message');
  if ($allMessages.length > messageMax) {
    $allMessages.first().remove();
  }
}

function adjustScroll() {
  $('.message-list-container').scrollTop($('.message-list-container')[0].scrollHeight);
}

export function handleMsg(msg) {
  const $msg = createMsgEl(msg);
  $('.message-list').append($msg);
  clearOveredMsg();
  adjustScroll();
}
