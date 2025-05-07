import { useAppDispatch } from "@/store/store";
import { showContextualClippyMessage } from "@/store/clippy-slice";

export function useClippy() {
  const dispatch = useAppDispatch();

  const triggerClippy = (category: string) => {
    dispatch(showContextualClippyMessage(category));
  };

  const dispatchAppAction = (actionType: string, actionData?: any) => {
    const event = new CustomEvent("app-action", {
      detail: {
        type: actionType,
        data: actionData,
      },
    });
    window.dispatchEvent(event);
  };

  return {
    triggerClippy,
    dispatchAppAction,
  };
}
