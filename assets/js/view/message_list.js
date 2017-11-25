import {pd as PrettyData} from 'pretty-data';

const messageMax = 20;

function createTextBody({body}) {
  const $el = $('<div class="message-body">');
  const $main = $('<div class="message-body-main message-body-main-text">').text(body);
  return $el.append($main);
}

function createXmlBody({body, meta}) {
  const $el = $('<div class="message-body">');
  const $main = $('<div class="message-body-main message-body-main-xml">').text(PrettyData.xml(body));
  const $meta = $('<div>').text(meta.isValid ? '[ 有効なXMLです ]' : '[ 不正なXMLです ]');
  return $el.append([$meta, $main]);
}

function createBodyEl({type, body, meta}) {
  switch(type) {
  case 'text':
    return createTextBody({body, meta});
  case 'xml':
    return createXmlBody({body, meta});
  }
}

function createMsgEl({name, type, body, meta}) {
  const $msg = $('<div class="message">');
  const $header = $('<div class="message-header">');
  const $name = $('<span class="message-name">')
    .text(name)
    .toggleClass('message-name-system', name === 'system');
  const $type = $('<span class="message-type">').text(type);
  $header.append([$name, $type]);
  const $body = createBodyEl({type, body, meta});
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
