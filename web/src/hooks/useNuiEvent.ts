import { MutableRefObject, useEffect, useRef } from "react";
import { noop } from "../utils/misc";
import { useNui } from "@/providers/NuiProvider";

interface NuiMessageData<T = unknown> {
  action: string;
  data: T;
}

type NuiHandlerSignature<T> = (data: T) => void;

/**
 * A hook that manage events listeners for receiving data from the client scripts
 * @param action The specific `action` that should be listened for.
 * @param handler The callback function that will handle data relayed by this hook
 *
 * @example
 * useNuiEvent<{visibility: true, wasVisible: 'something'}>('setVisible', (data) => {
 *   // whatever logic you want
 * })
 *
 **/

export const useNuiEvent = <T = unknown>(
  action: string,
  handler: (data: T) => void,
) => {
  const nui = useNui();

  useEffect(() => {
    const eventId = nui.RegisterEvent<T>(action, handler);

    return () => nui.UnRegisterEvent(eventId);
  }, [])
};
