type JobPagePayload = {
  title: string;
  url: string;
  textSnippet: string;
};

function getJobPagePayload(): JobPagePayload {
  const bodyText = document.body?.innerText || '';
  const normalized = bodyText.replace(/\s+/g, ' ').trim();

  return {
    title: document.title,
    url: window.location.href,
    textSnippet: normalized.slice(0, 6000),
  };
}

const extensionApi = (globalThis as { chrome?: any }).chrome;

if (extensionApi?.runtime?.onMessage) {
  extensionApi.runtime.onMessage.addListener((message: { type?: string }, _sender: unknown, sendResponse: (response: unknown) => void) => {
    if (message?.type === 'APPLISYNAI_GET_JOB_PAGE_TEXT') {
      sendResponse({ ok: true, payload: getJobPagePayload() });
      return;
    }

    sendResponse({ ok: false, error: 'Unknown message type' });
  });
}

export {};
