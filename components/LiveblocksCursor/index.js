import {
  RoomProvider,
  useUpdateMyPresence,
  useOthers,
} from "@liveblocks/react";
import React, { useEffect } from 'react'
import { Cursor } from './Cursor'

export const useWindowLiveCursors = () => {
  const updateMyPresence = useUpdateMyPresence();

  useEffect(() => {
    let scroll = {
      x: window.scrollX,
      y: window.scrollY,
    };

    let lastPosition = null;

    function transformPosition(point) {
      return {
        x: point.x / window.innerWidth,
        y: point.y,
      };
    }

    function onPointerMove(event) {
      const position = {
        x: event.pageX,
        y: event.pageY,
      };
      lastPosition = position;
      updateMyPresence({
        cursor: transformPosition(position),
      });
    }

    function onPointerLeave() {
      lastPosition = null;
      updateMyPresence({ cursor: null });
    }

    function onDocumentScroll() {
      if (lastPosition) {
        const offsetX = window.scrollX - scroll.x;
        const offsetY = window.scrollY - scroll.y;
        const position = {
          x: lastPosition.x + offsetX,
          y: lastPosition.y + offsetY,
        };
        lastPosition = position;
        updateMyPresence({
          cursor: transformPosition(position),
        });
      }
      scroll.x = window.scrollX;
      scroll.y = window.scrollY;
    }

    document.addEventListener("scroll", onDocumentScroll);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      document.removeEventListener("scroll", onDocumentScroll);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [updateMyPresence]);

  const others = useOthers();

  return others
    .toArray()
    .filter((user) => user.presence?.cursor != null)
    .map(({ connectionId, presence, id, info }) => {
      return {
        x: presence.cursor.x * window.innerWidth,
        y: presence.cursor.y,
        connectionId,
        id,
        info,
        presence,
      };
    });
}

const Canvas = ({children}) => {

  const cursors = useWindowLiveCursors();

  return(
    <div>
      {children}
      {cursors.map(({ x, y, connectionId }) => (
        <Cursor
          key={connectionId}
          x={x}
          y={y}
          connectionId={connectionId}
        />
      ))}
    </div>
  )
}

export default function LiveblocksCursor({ room, children }) {

  return (
    <RoomProvider id={room}>
      <Canvas room={room}>{children}</Canvas>
    </RoomProvider>
  )
}