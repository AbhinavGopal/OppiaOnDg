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
const {HtmlResponse} = require('actions-on-google');

const app = conversation({debug: true});
var page = 1

app.handle('LEARN_LESSON', (conv, topic) => {
  conv.add("Here's the lesson!");
  conv.add(new Canvas({
    url: `https://oppiaassistant.web.app`,
    })
  );
});



exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);