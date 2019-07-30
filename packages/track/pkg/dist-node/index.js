'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Track events with Tread
 *
 * @param {String} clientID Tread account client ID
 */
const track = clientID => {
  const events = ["click"];
  const trackSession = {
    id: Math.random().toString(36).substring(2, 15),
    clientID: clientID,
    path: window.location.pathname,
    type: "SESSION",
    userAgent: window.navigator.userAgent,
    url: window.location.origin
  };
  fetch("https://track.tread.fyi/", {
    body: JSON.stringify(trackSession),
    method: "POST"
  });
  events.map(event => window.addEventListener(event, eventData => {
    if (eventData.target.nodeName === "HTML") {
      return;
    }

    const trackEvent = {
      clientID: clientID,
      path: window.location.pathname,
      sessionID: trackSession.id,
      target: {
        nodeName: eventData.target.nodeName,
        id: eventData.target.id,
        className: eventData.target.className,
        textContent: eventData.target.textContent
      },
      timestamp: Date.now(),
      type: eventData.type,
      url: window.location.origin
    };
    fetch("https://track.tread.fyi/", {
      body: JSON.stringify(trackEvent),
      method: "POST"
    });
  }));
};

exports.default = track;
