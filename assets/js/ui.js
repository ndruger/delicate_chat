import {pd} from 'pretty-data';
import _ from 'lodash';

export function load(chan) {
  // $('.operation-type').change(() => {
  //   debugger;
  // });

  let lastKeyDownCode;
  $('.operation-textarea').keydown((e) => {
    lastKeyDownCode = e.keyCode;
  });

  $('.operation-textarea').keyup((e) => {
    // debugger;
    if (lastKeyDownCode == 13 && e.keyCode == 13 && !e.shiftKey) {
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

export function showSystemMessage({body}) {
  const metrics = JSON.parse(body);
  const els = _.map(metrics, (v, k) => {
    return $('<div>').text(`${k}: ${v.toLocaleString('en-US')}`);
  });
  $('.system-metrics').html(els);
}

export function showMessage({name, type, body}) {
  const $msg = $('<div class="message">');
  const $header = $('<div class="message-header">');
  const $name = $('<span class="message-name">')
    .text(name)
    .toggleClass('message-name-system', name === 'system');
  const $type = $('<span class="message-type">').text(type);
  $header.append([$name, $type]);
  const $body = createBodyEl({type, body});
  $msg.append([$header, $body]);
  $('.message-list').append($msg);
  $('.message-list-container').scrollTop($('.message-list-container')[0].scrollHeight);
}
