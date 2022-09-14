export function useVSCodeEvent<TEvent extends keyof WebViewEventFn>(event: TEvent, cb: WebViewEventFn[TEvent]) {
  useEventListener('message', (ev) => {
    const { eventName, params }: MessageEventData<TEvent> = ev.data

    if (eventName !== event) {
      return
    }

    cb(...(params as [any]))
  })
}
