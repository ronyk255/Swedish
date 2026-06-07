(function () {
  function clearBrowserCaches() {
    if (!("caches" in window)) return Promise.resolve();
    return caches.keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .catch(() => undefined);
  }

  function refreshLatest() {
    const url = new URL(window.location.href);
    url.searchParams.set("refresh", Date.now().toString());
    clearBrowserCaches().finally(() => {
      window.location.replace(url.toString());
    });
  }

  function addRefreshButton() {
    if (document.getElementById("refreshLatestPage")) return;
    const button = document.createElement("button");
    button.id = "refreshLatestPage";
    button.className = "refreshLatestButton";
    button.type = "button";
    button.textContent = "Refresh latest";
    button.title = "Reload this page with a cache-busting timestamp";
    button.addEventListener("click", refreshLatest);
    document.body.appendChild(button);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addRefreshButton);
  } else {
    addRefreshButton();
  }
})();
