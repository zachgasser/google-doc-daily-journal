// Listens for when the browser first starts up
chrome.runtime.onStartup.addListener(() => {
  console.log("Browser started. Opening or creating daily journal.");
  openOrCreateDailyJournal();
});

// Listens for when the user clicks the extension's icon in the toolbar
chrome.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked. Opening or creating daily journal.");
  openOrCreateDailyJournal();
});

// The main function to handle the Google Drive logic
async function openOrCreateDailyJournal() {
  try {
    const token = await getAuthToken();
    if (!token) {
      console.error("Authentication failed. Could not get token.");
      return;
    }

    const journalFolderId = await findOrCreateFolder(token, "Journal");
    if (!journalFolderId) {
      console.error("Could not find or create the 'Journal' folder.");
      return;
    }
    
    const todayDoc = await findOrCreateTodaysDocument(token, journalFolderId);
    if (todayDoc && todayDoc.webViewLink) {
      chrome.tabs.create({ url: todayDoc.webViewLink });
    } else {
      console.error("Failed to get the document's web view link.");
    }

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// --- Helper Functions ---

// 1. Get Authentication Token
function getAuthToken() {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(token);
      }
    });
  });
}

// 2. Find or Create a specific folder (e.g., "Journal")
async function findOrCreateFolder(token, folderName) {
  // The Drive API query for 'name' is case-insensitive, but we'll double-check to be safe.
  const query = `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)`;

  const searchResponse = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const searchResult = await searchResponse.json();

  // Loop through results to find a definitive case-insensitive match
  if (searchResult.files && searchResult.files.length > 0) {
    for (const file of searchResult.files) {
      if (file.name.toLowerCase() === folderName.toLowerCase()) {
        console.log(`Found existing folder '${file.name}' with ID: ${file.id}`);
        return file.id;
      }
    }
  }

  // If no suitable folder was found after checking, create a new one.
  console.log(`'${folderName}' folder not found. Creating it...`);
  const createUrl = 'https://www.googleapis.com/drive/v3/files';
  const fileMetadata = {
    'name': folderName, // Creates it with the proper capitalization
    'mimeType': 'application/vnd.google-apps.folder'
  };
  
  const createResponse = await fetch(createUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fileMetadata)
  });
  
  const newFolder = await createResponse.json();
  console.log(`Created '${folderName}' folder with ID: ${newFolder.id}`);
  return newFolder.id;
}

// 3. Find or Create today's journal document
async function findOrCreateTodaysDocument(token, parentFolderId) {
  const today = new Date();
  // Formats the date as YYYY-MM-DD
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  // Search for a document with today's date in the title within the parent folder
  const query = `mimeType='application/vnd.google-apps.document' and name='${formattedDate}' and '${parentFolderId}' in parents and trashed=false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,webViewLink)`;

  const searchResponse = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const searchResult = await searchResponse.json();

  if (searchResult.files && searchResult.files.length > 0) {
    console.log(`Found document for today: '${formattedDate}'`);
    return searchResult.files[0];
  } else {
    // If not found, create it
    console.log(`Document for '${formattedDate}' not found. Creating it...`);
    const createUrl = 'https://www.googleapis.com/drive/v3/files';
    const fileMetadata = {
      'name': formattedDate,
      'mimeType': 'application/vnd.google-apps.document',
      'parents': [parentFolderId]
    };

    const createResponse = await fetch(createUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fileMetadata)
    });

    const newDoc = await createResponse.json();
    console.log(`Created document for today with ID: ${newDoc.id}`);
    // We need to fetch the file again to get the webViewLink
    const getNewUrl = `https://www.googleapis.com/drive/v3/files/${newDoc.id}?fields=webViewLink`;
     const getNewResponse = await fetch(getNewUrl, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await getNewResponse.json();
  }
}

// You'll also need some icons for the extension. You can create your own, or use placeholders.
// For now, the extension will show a broken icon image until you add files named
// icon16.png, icon48.png, and icon128.png to your project folder.