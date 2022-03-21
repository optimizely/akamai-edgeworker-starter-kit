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

import {
  createInstance,
  OptimizelyDecideOption,
} from '@optimizely/optimizely-sdk/dist/optimizely.lite.es';
import WORKERCONFIG from '../bundle.json';
import { getDatafile, dispatchEvent } from './optimizely_helper';

const SDK_KEY = 'DCJwYAA77k2BRcsrj3d9b';
const USER_ID = 'AwesomeUser';
const FLAG_KEY = 'fastly_test';
const WORKER_VERSION = WORKERCONFIG['edgeworker-version'];

export async function onClientRequest (request) {
  try {
    const datafile = getDatafile(SDK_KEY);

    const optimizelyClient = createInstance({
      datafile,
      eventDispatcher: { dispatchEvent }
    });

    const optimizelyUserContext = optimizelyClient.createUserContext(USER_ID);
    const decision = optimizelyUserContext.decide(FLAG_KEY, [OptimizelyDecideOption.INCLUDE_REASONS, OptimizelyDecideOption.DISABLE_DECISION_EVENT]);    
    const datafileRevision = optimizelyClient.getOptimizelyConfig().revision;

    request.respondWith(
      200, {},
      `<html>
        <body>
          <h1>
            Worker version: ${WORKER_VERSION}
          </h1>
          <div>
            datafileRevision = ${datafileRevision} <br />
            flagKey = ${decision.flagKey} <br />
            enabled = ${decision.enabled} <br />
            variationKey = ${decision.variationKey} <br />
            reasons = ${decision.reasons} <br />
          </div>
        </body>
      </html>`,
    );
  } catch (e) {
    request.respondWith(
      500, {},
      `<html>
        <body>
          <h1>Error in worker: Version ${WORKER_VERSION} </h2>
          <div>${e.message}</div>
        </body>
      </html>`,
    );
  }
}
