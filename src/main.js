/**
 *    Copyright 2022, Optimizely and contributors
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import { logger } from 'log';
import { Cookies, SetCookie } from 'cookies';
import {
  createInstance,
  enums as OptimizelyEnums,
} from '@optimizely/optimizely-sdk/dist/optimizely.lite.es';
import { getDatafile, dispatchEvent } from './optimizely_helper';

const AKAMAI_CLIENT_ENGINE = "javascript-sdk/akamai-edgeworker";
const COOKIE_NAME_OPTIMIZELY_VISITOR_ID = 'optimizely_visitor_id';
const VARIABLE_NAME_USER_ID = "PMUSER_OPTIMIZELY_USER_ID";
let logStash = [];

function generateRandomUserId() {
  return `${Math.floor(Math.random() * 899999 + 100000)}`;
}

function log(message) {
  logStash.push(message);
  logger.log(message);
};

export async function onClientRequest (request) {
  logStash = [];
  let cookies = new Cookies(request.getHeader('Cookie'));

  // Fetch user Id from the cookie if available so a returning user from same browser session always sees the same variation.
  const userId = cookies.get(COOKIE_NAME_OPTIMIZELY_VISITOR_ID) || generateRandomUserId();
  request.setVariable(VARIABLE_NAME_USER_ID, userId);

  // fetch datafile from optimizely CDN and cache it with akamai for the given number of seconds
  //const datafile = await getDatafile("YOUR_SDK_KEY_HERE");
  const datafile = await getDatafile('DCJwYAA77k2BRcsrj3d9b');

  if (datafile === '') {
    log(`[optimizely] Failed to fetch the datafile, please check the optimizely sdk key`);
    sendGenericReponse(request, logStash);
    return;    
  }

  const optimizelyClient = createInstance({
    datafile,

    // keep the LOG_LEVEL to ERROR in production. Setting LOG_LEVEL to INFO or DEBUG can adversely impact performance.
    logLevel: OptimizelyEnums.LOG_LEVEL.ERROR,

    clientEngine: AKAMAI_CLIENT_ENGINE,

    /***
     * Optional event dispatcher. Please uncomment the following line if you want to dispatch an impression event to optimizely logx backend.
     * When enabled, an event is dispatched asynchronously. It does not impact the response time for a particular worker but it will
     * add to the total compute time of the worker and can impact fastly billing.
     */
    // eventDispatcher: { dispatchEvent }

    /* Add other Optimizely SDK initialization options here if needed */
  });
 
  const optimizelyUserContext = optimizelyClient.createUserContext(
    userId,
    {
      /* YOUR_OPTIONAL_ATTRIBUTES_HERE */
    }
  );

  // --- Using Optimizely Config
  const optimizelyConfig = optimizelyClient.getOptimizelyConfig();
  log(`[optimizely] Datafile Revision: ${optimizelyConfig.revision}`);

  // --- For a single flag --- //
  const decision = optimizelyUserContext.decide("YOUR_FLAG_HERE");
  if (decision.enabled) {
    log(
      `[optimizely] The Flag ${
        decision.flagKey
      } was Enabled for the user ${decision.userContext.getUserId()}`
    );
  } else {
    log(
      `[optimizely] The Flag ${
        decision.flagKey
      } was Not Enabled for the user ${decision.userContext.getUserId()}`
    );
  }

  // --- For all flags --- //
  const allDecisions = optimizelyUserContext.decideAll();
  Object.entries(allDecisions).forEach(([flagKey, decision]) => {
    if (decision.enabled) {
      log(
        `[optimizely] The Flag ${
          decision.flagKey
        } was Enabled for the user ${decision.userContext.getUserId()}`
      );
    } else {
      log(
        `[optimizely] The Flag ${
          decision.flagKey
        } was Not Enabled for the user ${decision.userContext.getUserId()}`
      );
    }
  });

  sendGenericReponse(request, logStash);
}

export async function onClientResponse (request, response) {
  const userId = request.getVariable(VARIABLE_NAME_USER_ID);
  const cookie = new SetCookie({
    name: COOKIE_NAME_OPTIMIZELY_VISITOR_ID,
    value: userId,
  });
  response.setHeader('Set-Cookie', cookie.toHeader());
}

function sendGenericReponse(request, logStash) {
  request.respondWith(
    200,
    {"Content-Type": "text/plain"},
    'Welcome to the Optimizely Starter Kit for Akamai Edge Workers. Check log messages in response headers for decision results.\n\n'
    + 'Log Messages:\n' + logStash.join('\n'),
  );
}
