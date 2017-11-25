import {pd as PrettyData} from 'pretty-data';
import _ from 'lodash';
import Chart from 'chart.js';

Chart.defaults.global.legend.display = false;

export function load(chan) {
  let lastKeyDownCode;
  $('.operation-textarea').keydown((e) => {
    lastKeyDownCode = e.keyCode;
  });

  $('.operation-textarea').keyup((e) => {
    if (lastKeyDownCode == 13 && e.keyCode == 13 && !e.shiftKey) {  // lastKeyDownCode for ime
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
  return  $('<div class="message-body message-body-xml">').text(PrettyData.xml(body));
}

function createBodyEl({type, body}) {
  switch(type) {
  case 'text':
    return createTextBody(body);
  case 'xml':
    return createXmlBody(body);
  }
}

const metricsHistoryMax = 80;
const charts = {};

function initChart($el) {
  var ctx = $el[0].getContext('2d');
  const color = 'rgb(255, 255, 255)';
  return new Chart(ctx, {
    type: 'line',
    responsive: false,
    maintainAspectRatio: false,
    data: {
      labels: _.times(metricsHistoryMax, () => ''),
      datasets: [{
        data: _.times(metricsHistoryMax, () => 0),
        fill: 'start',
        backgroundColor: [
          color,
        ],
        borderColor: [
          color,
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          display: false,
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

export function showSystemMsg({body}) {
  const metricGroups = JSON.parse(body);
  function genId(k) {
    return `metrics-${k}`;
  }

  if ($('.system-metrics').children().length == 0) {
    _.each(metricGroups, (metrics, groupName) => {
      const $group = $('<div class="metrics-group">');
      const $groupLabel = $('<div class="metrics-group-label">').text(groupName);
      $group.append($groupLabel);
      $('.system-metrics').append($group);
      _.each(metrics, (v, k) => {
        const id = genId(k);
        const $el = $('<div>').attr('id', id);
        const $label = $('<div class="metrics-label">');
        const $chartContainer = $('<div class="chart-container"><canvas></canvas></div>');
        $el.append([$label, $chartContainer]);
        $group.append($el);
        charts[id] = initChart($(`#${id} canvas`));
      });
    });
  }
  _.each(metricGroups, (metrics) => {
    _.each(metrics, (v, k) => {
      const id = genId(k);
      $(`#${id} .metrics-label`).text(`${k}: ${v.toLocaleString('en-US')}`);
      const chart = charts[id];
      const data = chart.data.datasets[0].data;
      data.push(v);
      data.shift();
      chart.update();
    });
  });
}

export function showMsg({name, type, body}) {
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
