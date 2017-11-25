import _ from 'lodash';
import Chart from 'chart.js';

Chart.defaults.global.legend.display = false;

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

function genMetricsId(k) {
  return `metrics-${k}`;
}

function initMetrics(metricGroups) {
  _.each(metricGroups, (metrics, groupName) => {
    const $group = $('<div class="metrics-group">');
    const $groupLabel = $('<div class="metrics-group-label">').text(groupName);
    $group.append($groupLabel);
    $('.system-metrics').append($group);
    _.each(metrics, (v, k) => {
      const id = genMetricsId(k);
      const $el = $('<div>').attr('id', id);
      const $label = $('<div class="metrics-label">');
      const $chartContainer = $('<div class="chart-container"><canvas></canvas></div>');
      $el.append([$label, $chartContainer]);
      $group.append($el);
      charts[id] = initChart($(`#${id} canvas`));
    });
  });
}

function updateMetrics(metricGroups) {
  _.each(metricGroups, (metrics) => {
    _.each(metrics, (v, k) => {
      const id = genMetricsId(k);
      $(`#${id} .metrics-label`).text(`${k}: ${v.toLocaleString('en-US')}`);
      const chart = charts[id];
      const data = chart.data.datasets[0].data;
      data.push(v);
      data.shift();
      chart.update();
    });
  });
}

export function handleMsg({body}) {
  const metricGroups = JSON.parse(body);
  if ($('.system-metrics').children().length == 0) {
    initMetrics(metricGroups);
  }
  updateMetrics(metricGroups);
}
