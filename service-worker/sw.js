import { clientsClaim } from "workbox-core"
/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching"

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

/** @type {RegExp[] | undefined} */
// let allowlist
// if (import.meta.env.DEV)
//   allowlist = [/^\/$/]

// // to allow work offline
// registerRoute(new NavigationRoute(
//   createHandlerBoundToURL('/index.js'),
//   { allowlist },
// ))

self.skipWaiting()
clientsClaim()
