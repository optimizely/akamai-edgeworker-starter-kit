import { createInstance } from "@optimizely/optimizely-sdk/dist/optimizely.lite.es"

import { getDatafile } from "./optimizely_helper"

export async function onClientRequest(request) {
  const datafile = await getDatafile("M3WtHRRsvibBwUcePTNyBs")
  if (datafile === "") {
    request.respondWith(
      500,
      { "Content-Type": "text/plain" },
      `[Optimizely] Failed to fetch the datafile, please check the SDK key`
    )
    return
  }

  const optimizely = createInstance({
    datafile,
  })

  const { success, reason } = await optimizely.onReady()

  optimizely.close()

  request.respondWith(
    200,
    { "Content-Type": "text/plain" },
    success ? "Hello from Akamai Edge Workers" : reason
  )
}

export async function onClientResponse(request, response) {}
