import { httpRequest } from 'http-request';
import {
  createInstance,
  OptimizelyDecideOption,
} from '@optimizely/optimizely-sdk/dist/optimizely.lite.es';
import WORKERCONFIG from './bundle.json';

const SDK_KEY = 'DCJwYAA77k2BRcsrj3d9b';
const USER_ID = 'AwesomeUser';
const FLAG_KEY = 'fastly_test';
const WORKER_VERSION = WORKERCONFIG['edgeworker-version'];

const dispatchEvent = async ({ url, params }) => {
  // Event cannot be dispatched in normal flow of `onClientRequest`
  // Akamai Edgeworkers do not allow POST Subrequest  
}

export async function onClientRequest (request) {
  try {
    let datafile = '';
    const datafileResponse = await httpRequest(`https://cdn.optimizely.com/datafiles/${SDK_KEY}.json`);
    if (datafileResponse.ok) {
      datafile = await datafileResponse.json();
    }

    const optimizelyClient = createInstance({
      datafile,
      eventBatchSize: 1,
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
