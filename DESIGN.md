# CS50-Project


This is our walkthrough to how we came to design Procrastanki the way we designed it:
Step 0: We decided to use Chrome Storage API to store all the data related to our app. The data is synced to the user's google account so that all his data is accessible from all his computers.

Step 1: We designed `popup.html` the popup window of our extension to be both concise but also good looking. Everything was meant to be as pleasant to the user as possible. It can also be opened on the navigator by the extension.
Notes: We added the option to press enter instead of clicking on the button. We also made sure the cursor goes back to the textblock 'Front flashcard' so that the user can add many flashcards as fast as possible.

Step 3: We stored `number`, the number of blocked websites, `websites`, a JSONified array of blocked websites, `numberFlash`, the number of flashcards added, `front`, the front card of the flashcards added, `back`, the back card of the flashcards added, `last_block`, the last url blocked, `Unlocked`, last time unblocked, `time`, the access time by default 15 seconds, `nbr`, the number of flashcards to unlock by default 10 (if there are 10 flashcards) and `correct` to keep track of the correct answers of the users in case he stops doing flashcards after a while to get back at it later.
Notes: For the flashcards, we tried to store our flashcards in a JSONified dictionary at first but it wasn't as practical. So, we store the flashcards in two array such that the front and the back have the same index in their respective arrays.

Step 4: We then wrote the functions in `popup.js`. `Display` displays the number of websites blocked and number of flashcards near the "Blocked Sites" button and the "Make flashcards" button respectively if there are any saved or initializes them to zero otherwise. `LoadFlash` loads existant flashcards in the dropdownmenu and `LoadWeb` loads existant websites in the dropdownmenu. `EmptyDropdown` empties either dropdownmenu if needed after adding or deleting an element. `AddWebsite` adds typed url to blocked websites. `DelWeb` unblocks one website from the dropdownmenu. `DelAllWeb` unblocks all websites. `AddFlash` adds a typed in flashcard. `DelFlash` deletes one flashcard from the dropdownmenu. `DelAllFlash` deletes all flashcards. `SetTF` sets block time or/and # flashcards. `Reinitialize` reinitializes the extension.

Step 5: We then moved on to `flashcards.js`. `ask` displays the random question. `check` checks the user's answer. This also allows us to redirect to `error.html` if we don't have any flashcard and redirects back to the last website blocked if the user finishes his flashcards.

Step 6: We then made `background.js`. It allows us to compare the time since last unlock, decide if it's time to block, check if the visited websites should be blocked using RegEx and comparing it the saved websites and redirect to our `flashcard.html`.

Step 7: `error.html` asks the user to add more flashcards and gives him the possibility to open up `popup.html` in the tab.

Step 8: `flashcard.html` is where the user will do his flashcards. We worked on making it pleasant too with dynamic components for fast completion.
