function handleChange(event) {
  chrome.storage.sync.set({ [event.target.id]: event.target.value }, () => {
    console.log({ [event.target.id]: event.target.value });
  });
}

function setCurrent() {
  Array.from(document.getElementsByTagName("input")).forEach(function (p) {
    p.addEventListener("change", handleChange, false);

    chrome.storage.sync.get([p.id], function (result) {
      if (!result[p.id]) {
        chrome.storage.sync.set(
          { [p.id]: formatterLib.json.defaults[p.id] },
          () => {}
        );
        set = formatterLib.json.defaults[p.id];
      } else {
        set = result[p.id];
        console.log("lol");
      }

      p.value = set;
    });
  });
}

document.getElementsByClassName("resetbtn")[0].addEventListener("click", () => {
  for (var [key, value] of Object.entries(formatterLib.json.defaults)) {
    chrome.storage.sync.set({ [key]: value }, () => {});
  }
  setCurrent();
});

setCurrent();
