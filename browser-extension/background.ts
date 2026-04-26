const extensionApi = (globalThis as { chrome?: any }).chrome;

if (extensionApi?.runtime?.onInstalled) {
  extensionApi.runtime.onInstalled.addListener(() => {
    console.log('[Applisynai Extension] Installed MVP scaffold');
  });
}

if (extensionApi?.runtime?.onMessage) {
  extensionApi.runtime.onMessage.addListener((message: { type?: string }, _sender: unknown, sendResponse: (response: unknown) => void) => {
    if (message?.type === 'APPLISYNAI_SAVE_JOB') {
      sendResponse({ ok: true, status: 'queued_mvp' });
      return;
    }

    sendResponse({ ok: true, status: 'noop' });
  });
}

export {};
