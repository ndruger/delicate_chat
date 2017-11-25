import _ from 'lodash';

const senarioInterval = 10;

function randomAlphaStr(len) {
  return _.times(len, () => (10 + _.random(25)).toString(36)).join('')  
}

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

  $('.xml-text-senario').click(() => {
    function generateXml() {
      const body = _.map(_.times(1000), () => {
        const tag = randomAlphaStr(40);
        return `<${tag}>a</${tag}>`;
      }).join();
      const start = '<msg>';
      const end = '</msg>';
      return `${start}${body}${end}`;
    }
    setInterval(() => {
      const msg = {
        name: 'nobody',
        type: 'xml',
        body: generateXml(),
      };
      chan.push('new:msg', msg);
    }, senarioInterval);
  });

  function startPlainTextSenario(strLen) {
    setInterval(() => {
      const msg = {
        name: 'nobody',
        type: 'text',
        body: randomAlphaStr(strLen),
      };
      chan.push('new:msg', msg);
    }, senarioInterval);
  }

  $('.small-plain-text-senario').click(() => {
    startPlainTextSenario(10);
  });

  $('.large-plain-text-senario').click(() => {
    startPlainTextSenario(10000);
  });
}

