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
 
import { httpRequest } from 'http-request';

export async function getDatafile(sdkKey) {
  let datafile = '';
  
  // Akamai edgeworkers do not provide a way to cache the response through code.
  // In order to cache, make sure to enable caching to outgoing request from Akamai control panel
  // https://techdocs.akamai.com/purge-cache/docs/cache-strategies
  const datafileResponse = await httpRequest(`https://cdn.optimizely.com/datafiles/${sdkKey}.json`);
  if (datafileResponse.ok) {
    datafile = await datafileResponse.json();
  }
  return datafile;
}
 
export async function dispatchEvent(payload) {
  const eventResponse = await httpRequest('https://ew.logx.optimizely.com/v1/events', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Content-Length": payload.length,
    },
    body: payload,
  });

  return eventResponse.status;
}
