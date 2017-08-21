#Team 4 Proposal Card-Battle Members (Dan Martin, Carly Warner, Ryan Edwards, MarkMarkMark)#

User Story Card-Battle (temporary basic name) 'Card Battle' is a game app where players can face off against their friends in a battle type style. There will be a register and login option upon the website loading, with implementation of auth and conditionals to determine which options to display across the different pages, along with a logout option once a user has logged in.

Once a user has either registerd an account or logged in to a previously created account, they are redirected to the home page. On this home page, there is a deck of 50 cards, and users are dealt 10 cards randomly from the deck. The deck is full of cards with different stats for health and defense. Once both users have been dealt their cards (at this point only the user can see their own cards), they can face off. Card names are editable once users have them in their deck. 

To play, users will get a randomly generated 5 cards from their respective card piles. When both users receive their 5 to play, they face each other head to head. When they are playing against each other, they are then able to see the 5 cards they have been dealt, and select which card to play for each matchup.

Users are given a set number of health before they face off, and depending on what cards they play will determine how much health they lose (cards having stats of attack/defense).

Winner will be determined by who has the most health remaining after the round. Players are able to add a random new card to their deck every day, but can have a maximum of 20 cards in their deck at a time. If they want to add another card and they are at their max of 20, they have to pick a card to delete. 


#WireFrames#

**Welcome Page**
![Wireframe 1](/assets/1.jpg)

**Login Page**
![Wireframe 2](/assets/2.jpg)

**Register Page**
![Wireframe 3](/assets/3.jpg)

**New User page**
![Wireframe 4](/assets/4.jpg)

**User Options page**
![Wireframe 5](/assets/5.jpg)

**Users card deck**
![Wireframe 6](/assets/6.jpg)

**Game Options**
![Wireframe 7](/assets/7.jpg)

**Quick Death Game Type**
![Wireframe 8](/assets/8.jpg)

**Select User to play**
![Wireframe 9](/assets/9.jpg)

**Standard 5v5 card battle**
![Wireframe 10](/assets/10.jpg)

**Leaderboard**
![Wireframe 11](/assets/11.jpg)

**Tables**
![Wireframe 12](/assets/12.jpg)


#Technologies#

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

* Game logic for 2 players aainst each other
    * Win condition

**Phase 1**
* Leaderboard
* Different game modes
* Currency

**Phase 2**
* Animations -> (Book for cards, card click/play animations.. etc.)
* Challenge another user
* User profile pictures

**Phase 3**
* Chatroom features
* More powerful / diverse cards with more complex purposes