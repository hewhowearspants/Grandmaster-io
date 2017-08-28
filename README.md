https://tranquil-sierra-66936.herokuapp.com/

# Team 4 - Card-Battle 
### Members 
##### Dan Martin, Carly Warner, Ryan Edwards, MarkMarkMark

## Technologies used
* CSS - Overall page design and animations
* Adobe Illustrator - Cards
* Photoshop - Background images
* Postgres - Create our database
* FireBase - Store our information online
* Auth - Login security
* SocketIO - Chat and for the online game component
* React - Front end
* Express - Back end

### General approach
    We decided to begin by creating a functional offline application before we took it online and added socket and firebase. We had high goals we thought we could reach, but we still wanted to be smart and not dig ourselves in to a hole. 

    Picking what we were going to do was probably the most time consuming part. We had to brainstorm ideas on paper and list out how we could implement different technologies to the different apps, and we all agreed a game would be the most fun for all of us, and would allow us to reach a manageable MVP with a great deal of room to grow if there was time. There are still many features we would love to add when we have time. 

    The time we spent wireframing and writing user stories, along with database structures, technologies to use, and how each will play a role, it made it much more seamless to split up our work and be most efficient. (Pictures of those whitbeoarding sessions are included). I have a new appreciation for the value of whiteboarding for a project. We would not have come as far as we did as efficiently as we did if it were not for the time we spent preparing. 

### Installation instructions for any dependencies
    After forking and cloning the repo, all of the necessary dependencies are already in the package.json. So just navigate to the main folder, run yarn install in your terminal, then navigate to the client folder and run yarn install there.

    Create a database in your terminal and name it whatever you like, (we named our dream_team_dev). After you create that, write the line 

        \c whatever_you_called_your_database ;
        
    at the top of your migration and seed files.
Then in your terminal navigate to the db/migration folder and run
psqf -f migration-082117.sql
then cd ..
cd in to db/seeds folder and run
psql -f seed.sql

This will connect to your databse, then create the tables you need to run the app, and populate the tables with what your app needs to function. 

To run the app, go back to the main folder, run yarn dev in your terminal, then open up a new tab and cd in to the client folder, and run yarn start. Then you are good to go, enjoy :)


'Card Battle' is a game app where players can face off against their friends in a battle type style. There will be a register and login option upon the website loading, with implementation of auth and conditionals to determine which options to display across the different pages, along with a logout option once a user has logged in.

Once a user has either registerd an account or logged in to a previously created account, they are redirected to the home page. On this home page, there is a deck of 50 cards, and users are dealt 10 cards randomly from the deck. The deck is full of cards with different stats for health and defense. Once both users have been dealt their cards (at this point only the user can see their own cards), they can face off. Card names are editable once users have them in their deck. 

To play, users will get a randomly generated 5 cards from their respective card piles. When both users receive their 5 to play, they face each other head to head. When they are playing against each other, they are then able to see the 5 cards they have been dealt, and select which card to play for each matchup.

Users are given a set number of health before they face off, and depending on what cards they play will determine how much health they lose (cards having stats of attack/defense).

Winner will be determined by who has the most health remaining after the round. Players are able to add a random new card to their deck every day, but can have a maximum of 20 cards in their deck at a time. If they want to add another card and they are at their max of 20, they have to pick a card to delete. 

Users
    Nerdy boys with low self esteem need to compete against others so they can feel better about themselves

[Links to ERD, User Stories, Wireframes](./assets)

### Unsolved Problems
For the most part we solved everything, except - 
The rounds are not always consistent with the amount of cards the users can play per round, we will fix it though! We worked efficiently and collaboratively on everything, and with constant communication on slack or during the week during class hours and staying after class, everything came together amazing.