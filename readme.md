# PPLpleaser
A fun polling website.

## User Stories
- [X] User should be able to sign in.
- [X] User should be able to view various polls
- [X] User should be able to add categories to vote on.
- [X] User should be able to add entries to various categories.
- [X] User should be able to vote on a category IF they are a signed in user.

## The Website
Heroku Link: https://pplpleaser.herokuapp.com/

## Approach Taken
My goal for PPLpleaser was for there to be categories that users could vote on to see which member (ie. contestant) of that category was the best contestant of that particular category.

While I was able to set up a functional voting PUT route, it updated the votes value for EACH contestant of that particular category, and it took me a while to figure out how to have it update the value for each individual contestant.

### Design
My goal for the design of PPLpleaser was to keep it simple/minimalistic. I have a tendency with CSS to love to try all the wild effects and colors, etc. I wanted to challenge myself this time to keep it practical and focus more on the smooth use of the product.

## Technologies Used
- HTML
- CSS
- Javascript
- Node.js
- Mongoose
- Express
- EJS

## Struggles
- Having difficulty setting up the individual contestants by referencing/updating my Array of Objects in my schema (thank you **Aarik** and **Jay** for helping me solve this!)
-Updating individual contestant votes - first tried to do it via subarrays. Then, ended up creating a whole new model which allowed me to query it specifically.

## TODO / Unresolved Items
- [X] Set up MVC
- [X] Set up Authentication
- [X] Deploy on Heroku - make publicly accessible
- [X] Set up WRONG password / user not found handling using !foundUser
- [X] Set up VOTE Feature / PUT Route (currently updates ALL votes for each contestant)
- [X] Change VOTE button to light blue / but red on hover
- [ ] Allow only ONE vote (use Boolean?)
- [ ] Consider making SORTING features for main category page (for sorting categories)
- [ ] Have SORT by ALPHABETICAL LIST feature
- [ ] Set up EJS Partials
