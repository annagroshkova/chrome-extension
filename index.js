let myLeads = [];
const inputEl = document.querySelector('.input-el');
const ulEl = document.querySelector('.ul-el');
const inputSaveButton = document.querySelector('.input-btn');
const deleteButton = document.querySelector('.delete-btn');
const tabButton = document.querySelector('.tab-btn');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads(myLeads)
}

function renderLeads(leads) {
  let listItems = '';
  leads.forEach((lead) => {
    listItems += `
            <li>
              <a target='_blank' href='${lead}'>
                  ${lead}
              </a>
          </li>
        `
  })
  ulEl.innerHTML = listItems
}

function saveLead() {
  if(inputEl.value !== '') {
    myLeads.push(inputEl.value);
    inputEl.value = '';
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads(myLeads);
  }
}

inputSaveButton.addEventListener('click', saveLead);

deleteButton.addEventListener('dblclick', () => {
  localStorage.clear();
  myLeads = [];
  renderLeads(myLeads);
});

tabButton.addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
  })
});
