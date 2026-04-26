const extensionApi = (globalThis as { chrome?: any }).chrome;
const statusEl = document.getElementById('status');

function setStatus(message: string) {
  if (statusEl) {
    statusEl.textContent = message;
  }
}

async function getCurrentTabId(): Promise<number | null> {
  if (!extensionApi?.tabs?.query) return null;
  const tabs = await extensionApi.tabs.query({ active: true, currentWindow: true });
  return tabs?.[0]?.id ?? null;
}

async function requestPagePayload() {
  const tabId = await getCurrentTabId();
  if (!tabId || !extensionApi?.tabs?.sendMessage) {
    setStatus('Unable to access current tab.');
    return null;
  }

  return extensionApi.tabs.sendMessage(tabId, { type: 'APPLISYNAI_GET_JOB_PAGE_TEXT' });
}

document.getElementById('save-job')?.addEventListener('click', async () => {
  const response = await requestPagePayload();
  if (response?.ok) {
    setStatus('Job captured from page (MVP local only).');
    return;
  }
  setStatus('Could not capture job data from this page.');
});

document.getElementById('match-job')?.addEventListener('click', async () => {
  const response = await requestPagePayload();
  if (response?.ok) {
    setStatus('Job matched action queued (connect app integration next).');
    return;
  }
  setStatus('Match action unavailable on this page.');
});

document.getElementById('tailor-resume')?.addEventListener('click', async () => {
  const response = await requestPagePayload();
  if (response?.ok) {
    setStatus('Tailor resume action queued (MVP stub).');
    return;
  }
  setStatus('Tailor action unavailable on this page.');
});

export {};
