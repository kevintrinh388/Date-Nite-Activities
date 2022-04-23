# DateNite

<b>Because Finding a Date is Hard Enough, Let Us Help You Plan One...</b>

Link to heroku - https://banana-crisp-94556.herokuapp.com/

Link to heroku(Sprint 2) - https://date-nite-activities.herokuapp.com/

DateNite is a date planning web application
that shows information about restaurants and activities for a certain location including links to their yelp page and an interactive map. This data is dynamically fetched using the GoogleMaps API and Yelp API.

React packages: react-router, react-bootstrap, react-icons, styled-components, loglevel, react-toastify

# Features

 1. Google Log-In 
 2. Regular User Log-In
 3. Customizisation of user name when logged in through regular email 
 4. Auto-Complete search bar
 5. Filter out a restaurant, event, price and ratings 
 6. Find the place on the map
 7. Add Favorites to the dashboard
 8. Pick a date and time on the favorite restaraunt/activity
 9. Save the date/event to your google calendar
 10. Delete favorites from the dashboard and the home page
 11. Contact-Us for suggestions 

## Installation

1. Clone project from git hub

```bash
  git clone https://github.com/kevintrinh388/Date-Nite-Activities.git
```

2. Install the following packages:

```bash
  pip install requests
  pip install python-dotenv
  pip install flask
  pip install flask-login
  pip install Flask-SQLAlchemy==2.1
  pip install psycopg2-binary
  sudo apt install postgresql
  sudo apt install npm
```

3. Create a .env file to store the following as environment variables:

```bash
  MAPS_KEY=""
  YELP_URL=""
  MY_DATABSE=""
  REACT_APP_CLIENT_ID=""
  SECRET_KEY=""
  REACT_APP_SERVICE_ID=""
  REACT_APP_TEMPLATE_ID=""
  REACT_APP_PUBLIC_KEY=""
  REACT_APP_CALENDAR_KEY=""
  MAIL_SERVER = ""
  MAIL_USERNAME = ""
  MAIL_PASSWORD = ""
```

4. Run the command below in the main directory to pull in all the node packages you need.

```bash
  npm ci
```

5. To run the code, first run. Remember to run this command after any change in a React file.

```bash
  npm run build
```

6. Then run app.py.

```bash
  python3 app.py
```

## Authors

- [Nadia Faiz](https://github.com/nadiafaiz)
- [Nivin Kurien](https://github.com/starrugger)
- [Shubhada Mandala](https://github.com/smandala1)
- [Yalini Nadar](https://github.com/YaliniNadar)
- [Kevin Trinh](https://github.com/kevintrinh388)

---

Developer commands:

1. Make code changes
2. Run `npm run build`
3. Run `npm ci`
4. Run `npm run watch`
5. Open new terminal tab, run `python3 app.py`
6. If there are no errors from the above commands, submit a pull request following the below commands

Useful Commands

```
git checkout -b feature
git add --all
git commit -m "feature commit"
git push origin feature
```
