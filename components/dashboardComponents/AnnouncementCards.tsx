import React from 'react';

/**
 * Announcement Cards Component
 *
 * Cards for announcements section in hack center
 */

function AnouncementCard(props) {
  return (
    <>
      <div
        id="announcement-content"
        className="mx-auto md:min-h-1/4 rounded-lg p-3 bg-white border-black border-2 w-auto"
      >
        {props.text}
      </div>
      <p className="text-right">{props.time}</p>
    </>
  );
}

export default AnouncementCard;
