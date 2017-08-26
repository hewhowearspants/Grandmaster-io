# Team 4 Proposal 
## Card-Battle 
### Members 
##### Dan Martin, Carly Warner, Ryan Edwards, MarkMarkMark

### User Story Card-Battle (temp name) 

'Card Battle' is a game app where players can face off against their friends in a battle type style. There will be a register and login option upon the website loading, with implementation of auth and conditionals to determine which options to display across the different pages, along with a logout option once a user has logged in.

Once a user has either registerd an account or logged in to a previously created account, they are redirected to the home page. On this home page, there is a deck of 50 cards, and users are dealt 10 cards randomly from the deck. The deck is full of cards with different stats for health and defense. Once both users have been dealt their cards (at this point only the user can see their own cards), they can face off. Card names are editable once users have them in their deck. 

To play, users will get a randomly generated 5 cards from their respective card piles. When both users receive their 5 to play, they face each other head to head. When they are playing against each other, they are then able to see the 5 cards they have been dealt, and select which card to play for each matchup.

Users are given a set number of health before they face off, and depending on what cards they play will determine how much health they lose (cards having stats of attack/defense).

Winner will be determined by who has the most health remaining after the round. Players are able to add a random new card to their deck every day, but can have a maximum of 20 cards in their deck at a time. If they want to add another card and they are at their max of 20, they have to pick a card to delete. 

Users
    Nerdy boys with low self esteem need to compete against others so they can feel better about themselves


## WireFrames

**Login Page**
![Wireframe 1](/assets/1.jpg)

**Register Page**
![Wireframe 2](/assets/2.jpg)

**Dashboards**
![Wireframe 3](/assets/dashboard1.jpg)

![Wireframe 4](/assets/dashboard2.jpg)

![Wireframe 5](/assets/dashboard3.jpg)

![Wireframe 6](/assets/dashboard4.jpg)

**Lobbies**
![Wireframe 7](/assets/lobby1.jpg)

![Wireframe 8](/assets/lobby2.jpg)

**Game Start 1**
![Wireframe 9](/assets/gamestart.jpg)

**Game Start 2**
![Wireframe 10](/assets/gamestart2.jpg)

**Game Chat**
![Wireframe 11](/assets/chatbox.jpg)

**Components**
![Wireframe 12](/assets/components.jpg)

**Board**
![Wireframe 13](/assets/board.jpg)

**Game Wire**
![Wireframe 14](/assets/game-wire.png)

**user-dashboard**
![Wireframe 15](/assets/user-dashboard.png)

**card-back**
![Wireframe 16](/assets/card-back.png)


## Technologies

* Auth
* CSS
* Postgres
* FireBase
* SocketIO
* React
* Express

**Phase -2**
* File Structure
* Db structure
* Git Repo

**Phase -1**
* Seed file for cards (50)
* Basic express / react routes
* Set up auth
* Create components
* Structure for front end, to be able to access components

**Phase 0** *MVP*
* SocketIO
    * Chatroom
    * Room component
    * Leaderboard
* Game logic for 2 players aainst each other
    * Win condition

**Phase 1**
* Different game modes
* Currency

**Phase 2**
* Animations -> (Book for cards, card click/play animations.. etc.)
* Challenge another user
* User profile pictures

**Phase 3**
* Chatroom features
* More powerful / diverse cards with more complex purposes