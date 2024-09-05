# Moodify-Web-APP
A music webapp that sees you, understands you.      

**Video Demo**:https://youtu.be/iXTTnEAbFfY      
**Link to Project**: <a href="https://music-moodify.herokuapp.com/">here</a> 

## Description
For our final project, we were having issues coming up with an idea. Despite the myriad of topics we covered in class, we could not come up with an idea that was both a cool use of interactive machine learning and feasible. We knew from the get go that we were excited about the idea of making some form of recommender system, but building one from scratch is one of the most difficult machine learning tasks and we did not have the know-how or time to make one. Throughout the semester, we became very comfortable with leveraging existing machine learning solutions both in the browser using JavaScript and the backend using Python's Flask. As such, we decided to combine our skillset, our love for Spotify, and our desire to make a recommender system to make Moodify, a web application that leverages tensorflow.js for computer vision capabilities in the browser to detect a user's mood and Spotify's API to create a playlist of song recommendations for the user based on their Spotify usage patterns and the mood detected in the browser. 



## Process and Implementation

### Frontend 

In the frontend, our web application relies on <a href="https://github.com/justadudewhohacks/face-api.js/"> face-api.js</a>, JavaScript API for face detection and face recognition in the browser built on top of tensorflow.js, and p5.js, a Processing Library for the browser. Face-api has a trained model for face detection (found in ```static/models/```) which we use to classify a person's facial expression every frame in p5's draw loop. Once a person clicks on the ```Submit to Spotify``` button, we defined the following heuristics to match a person's facial expression to a value we can use for the Spotify API:


```javascript

if (highest_val_mood === 'angry')   mood_val = 0.0;

else if (highest_val_mood === 'disgusted')  mood_val = 0.2

else if (highest_val_mood === 'happy')  mood_val = 1.0;

else if (highest_val_mood === 'sad')    mood_val = 0.1;

else if (highest_val_mood === 'surprised')  mood_val = 0.7;

```
where ```highest_val_mood``` is the mood with the highest probability, which can be : angry,disgusted,happy,neutral,sad, surprised. 

This heuristic could be modified and further improved, but this ones gave us some very interesting results. 

### Backend
We used Flask as our backend server and the <a href='https://spotipy.readthedocs.io/en/2.16.1/'>Spotipy library</a> to create the playlist. We first take the user's Spotify username and follow the Spotify user <a href='https://developer.spotify.com/documentation/general/guides/authorization-guide/'>authorization flow</a> to obtain authorization to the SPotify API. The following are the steps to obtain authorization (in *main.py*):
1. Get username 
2. Request authorization
3. User logs in to grant authorization access
4. Request access token
5. Use access token to make API requests

Once the access token is acquired, we wait for a fetch post request from the front-end for when the user clicks on the *Submit to Spotify* button.
On submitting the fetch post request, we create a list of the user's top artists, get all tracks for that artist, select tracks within a certain mood based on Spotify's audio features namely valence, danceability and energy, and then create a playlist from these selected moody tracks.

We then get the link for the newly created playlist and redirect the user to the spotify playlist.

## Reflection and Evaluation
We really liked working on this project because it brings together different third party systems into one place, which provided a great learning experience for us as students. Furthermore, from all of the class projects we have worked on, we believe this is an actual application we would use to explore new songs on Spotify. One limitation is that the application is currently only for people with Spotify accounts. In the future, we hope to add an option for people without Spotify user accounts to enable them to be able to use the application as well.




## Resources

# To get face mood recognition in the browser
- MainDocs: https://justadudewhohacks.github.io/face-api.js/docs/index.html
- Face-API.js: https://github.com/justadudewhohacks/face-api.js/
    - https://itnext.io/face-api-js-javascript-api-for-face-recognition-in-the-browser-with-tensorflow-js-bcc2a6c4cf07
- https://heartbeat.fritz.ai/building-a-motivation-bot-with-tensorflow-js-face-detection-and-emotion-classification-7b80a38eb9c3
- https://medium.com/better-programming/add-facial-recognition-to-your-app-easily-with-face-api-js-58df65921e7

# Playlist Creation
https://medium.com/@mohithsubbarao/moodtape-using-spotify-api-to-create-mood-generated-playlists-6e1244c70892
