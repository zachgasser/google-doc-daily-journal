# Google Doc Daily Journal - Chrome Extension
This Chrome extension creates a new Google Doc every day. Each doc is titled the day it was created, and is stored in a folder in your Google Drive called 'Journal'. Use this as your daily journal!

With a [Google One Ai Pro](https://one.google.com/about/google-ai-plans/) subscription ($20/month) you can converse with Gemini about your journal entries!
![alt text](images_for_readme/converse_with_gemini_about_your_journal.png)

The following steps walk you through setting up the chrome extension on your machine. You need to do this process every time you want to add this extension to a machine.

## Step 1
Scroll to the top of this page and download zip.
![alt text](images_for_readme/github_download_zip.png)

---

## Step 2
Double click downloaded zip folder.
![alt text](images_for_readme/click_zip_folder.png)

---

## Step 3
Move actual folder somewhere (moving it or deleting it later will break the chrome extension).
![alt text](images_for_readme/move_folder.png)

---

## Step 4
Go to [chrome://extensions](chrome://extensions).
![alt text](images_for_readme/chrome_extensions_address_bar.png)

---

## Step 5
Enable developer mode (1) and click 'Load upacked' (2).
![alt text](images_for_readme/chrome_extensions_load_unpacked.png)
Navigate to the folder you moved in Step 3, select it, then click 'Select Folder'.
![alt text](images_for_readme/select_folder_for_load_unpacked.png)

---

## Step 6
Copy the id that shows up with your new extension. You'll need it in Step 18.
![alt text](images_for_readme/chrome_extensions_id.png)

---

## Step 7
### If you already have a GCP project set up, skip to Step 11.
Go to [Google Cloud Platform](https://cloud.google.com/) and start for free.
![alt text](images_for_readme/gcp_start_free.png)

---

## Step 8
Put payment info and click 'Start free'. Notice you will not be charged unless you explicitly 'Activate' a full pay-as-you-go account (which we will not be doing).
![alt text](images_for_readme/gcp_payment_info.png)

---

## Step 9
Click 'Agree & Continue'.
![alt text](images_for_readme/gcp_agree_and_continue.png)

---

## Step 10
Click 'close' if you see this popup and click 'Dismiss' on the top alert.
![alt text](images_for_readme/gcp_close_and_dismiss.png)

---

## Step 11
Type 'google drive api' in the top search bar in GCP. Click to go to the Google Drive API.
![alt text](images_for_readme/gcp_go_to_google_drive_api.png)

---

## Step 12
Click to enable the Google Drive API.
![alt text](images_for_readme/enable_google_drive_api.png)

---

## Step 13
Type 'google auth platform' in the top search bar. Click to go to the Google Auth Platform.
![alt text](images_for_readme/gcp_search_google_auth_platform.png)

---

## Step 14
Click 'Get started'.
![alt text](images_for_readme/gcp_auth_get_started.png)

---

## Step 15
Name the app 'Google Doc Daily Journal' and put your email as 'User support email'
Select 'Internal' as audience.
Put your email as the contact email.
![alt text](images_for_readme/gcp_app_info_1.png)




---

## Step 16
After finishing the setup you will see this screen. Click 'Create OAuth client'.
![alt text](images_for_readme/gcp_auth_create_oauth_client.png)

---

## Step 17
Select 'Chrome Extension'.
![alt text](images_for_readme/gcp_oauth_chrome_extension.png)

---

## Step 18
Name you OAuth Client 'Google Doc Daily Journal OAuth Client' and paste the ID you got from Step 6 into 'Item ID'.
![alt text](images_for_readme/gcp_oauth_name_and_id.png)

---

## Step 19
After clicking to finish creating the OAuth Client you will see this screen. Click the copy button to copy the Client ID. You'll need it in Step 22.
![alt text](images_for_readme/gcp_get_client_id.png)

---

## Step 20
Go to the location of your chrome extension folder (wherever you moved it in step 3) and open the folder.

---

## Step 21
Edit the 'manifest' file using Notepad.
![alt text](images_for_readme/open_with_notepad.png)

---

## Step 22
Replace the "\_\_\_ENTER YOUR CLIENT ID HERE\_\_\_" part with the client ID you got in step 19 (make sure you leave the double quotes around the ID).
![alt text](images_for_readme/put_client_id_in_manifest.png)

---

## Step 23
Go back to [chrome://extensions](chrome://extensions) and click the reload button.
![alt text](images_for_readme/chrome_extension_refresh_button.png)

---

## You Did It!!
Close your browser and reopen. Chrome will automatically create a folder called 'Journal' in your Google Drive and a Google Doc in the Journal folder titled with today's date. If you close your browser and open it later today, it will continue to open today's Google Doc. When you open Chrome tomorrow it will create a new Google Doc titled with tomorrow's date.
