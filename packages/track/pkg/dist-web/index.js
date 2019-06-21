/**
 * Track events with Tread
 *
 * @param {String} clientID Tread account client ID
 */
const track = clientID => {
  const events = ["click"];
  events.map(event => window.addEventListener(event, eventData => {
    if (eventData.target.nodeName === "HTML") {
      return;
    }

    const trackEvent = {
      clientID: clientID,
      target: {
        nodeName: eventData.target.nodeName,
        id: eventData.target.id,
        className: eventData.target.className,
        textContent: eventData.target.textContent
      },
      timestamp: Date.now(),
      type: eventData.type,
      url: window.location.href
    }; // TODO: Update endpoint to `track.tread.fyi`

    fetch("http://localhost:3000", {
      body: JSON.stringify(trackEvent),
      method: "POST"
    });
  }));
};

export default track;
