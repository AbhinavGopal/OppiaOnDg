/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const {
  conversation,
  Canvas,
  Simple
} = require('@assistant/conversation');
const functions = require('firebase-functions');
const {HtmlResponse, Carousel, Image} = require('actions-on-google');

const app = conversation({debug: true});

app.handle('LEARN_LESSON', (conv) => {
  conv.add("Here's the lesson!");
  if (conv.intent.params.topic.resolved === 'fractions' || conv.intent.params.topic.resolved === 'project demo') {
    conv.add(new Canvas({
      url: `https://oppiaassistant.web.app`,
      data: {
        command: 'HOSTNAME',
        details: 'https://oppiaassistant.web.app'
      }
      })
    );
  }
});

app.handle('DO_NOTHING', (conv) => {
  conv.add(new Canvas({
    data: {
      command: '',
      details: ''
    },
  }));
});

app.handle('CONTINUE', (conv) => {
  conv.add('continuing to next page');
  conv.add(new Canvas({
    data: {
      command: 'CONTINUE',
      details: ''
    },
  }));
});

app.handle('INPUT_TEXT', (conv) => {
  conv.add('Answering the question with your text');
  conv.add(new Canvas({
    data: {
      command: 'ENTER_TEXT_NUMBER_UNITS',
      details: 'Abhinav Gopal',
    }
  }));
});

app.handle('SUBMIT', (conv) => {
  conv.add('Submitting your answer')
  conv.add(new Canvas({
    data: {
      command: 'SUBMIT',
      details: '',
    }
  }));
});

app.handle('MULTIPLE_CHOICE', (conv) => {
  conv.add('Submitting your multiple choice response: Option-' + conv.intent.params.number.resolved);
  conv.add(new Canvas({
    data: {
      // command: 'ANSWER_QN',
      command: 'SELECT_ITEMS',
      details: conv.intent.params.number.resolved,
    }
  }));
});

app.handle('INPUT_FRACTION', (conv) => {
  conv.add('answering the question with your fraction');
  if (conv.intent.params.fraction.resolved.includes('+')) {
    conv.intent.params.fraction.resolved =
    conv.intent.params.fraction.resolved.replace('+', ' ');
  }
  conv.add(new Canvas({
    data: {
      command: 'ENTER_FRACTION',
      details: conv.intent.params.fraction.resolved
    }
  }));
});

app.handle('ADD_SET', (conv) => {
  conv.add('answering the question by adding the element');
  conv.add(new Canvas({
    data: {
      command: 'ADD',
      details: conv.intent.params.object.resolved,
      operation_type: 'ADD'
    }
  }));
});

app.handle('REMOVE_SET', (conv) => {
  conv.add('removing the element from the list');
  conv.add(new Canvas({
    data: {
      // command: 'ANSWER_QN',
      command: 'REMOVE',
      details: conv.intent.params.object.resolved,
      operation_type: 'REMOVE'
    }
  }));
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
