# Front End Capstone - 'Trainer'

### Motivation
I wanted to create an application that will help someone train for a race or create a workout plan with an end date/goal. I thoroughly enjoy racing, whether it's cycling, triathlon or running, and although there are a ton of apps already created for this, I would love to try and create my own version. Organizing and planning workouts are key to succeeding in your goals and my hope is that this application will help users succeed.

### [Deployed Site](https://cm-trainer.netlify.app/)

## Overview
This application is where a coach and athlete work together to create a race schedule and then workouts to prepare for those races.

## Planning
### [ERD](https://dbdiagram.io/d/60b2709bb29a09603d171b11)

### [Wireframe](https://www.figma.com/file/n0zW9BFw5XAbdPBJ1HBnHb/Capstone-Trainer?node-id=2%3A56)

### [User Flow Chart](https://docs.google.com/presentation/d/1QfsY9q46uwuG7AlJHKZR17Vm-mnCdS1AT9MYEFbkwn8/edit?usp=sharing)

### [Project Board](https://github.com/cmeffley/front-end-capstone/projects/1)
## Users
- A coach is the main user. They act as an admin over the athletes.
- Other users are athletes (there can be multiple).
- Both users must log in with Google Authentication.

### Features Coach
- Sign in with the Coach Log in.
- Read, create, edit and delete races in the race schedule.
- Read, create, edit and delete workouts for a specific race.
- Read a single workout view.
- Read, create, edit and delete quick workouts that an athlete can do if they are short on time.
- Read total miles and average pace for the workouts of a specific race.

### Features Athlete
- Sign in with the Athlete Log in.
- If the athlete has not signed in before, a new user will be created.
- Read, create, edit and delete races in the race schedule.
- Read all the workouts together, or in single view.
- Edit a workout, but only athlete completed portions.
- If the assigned day of the workout has passed, the athlete is cannot edit the workout.
- Read a quick workout, if they are short on time and cannot do the full workout.
- Read total miles and average pace for the workouts of a specific race.

### Other Features
- Both users are able to search the current weather.
- If the day of the race has passed, then the button to that race's workouts is disabled.

### Screenshot
![2021-06-25](https://user-images.githubusercontent.com/76795299/123496302-67328500-d5f5-11eb-974e-ae9357739caf.png)

### [Loom Walkthrough Video](https://www.loom.com/share/8d7e7e2d79ba4558915a977c85287f0f)
#### API Example call to Openweathermap:
`https://api.openweathermap.org/data/2.5/weather?q=Chattanooga&appid={{api}}&units=imperial`

```
{
    "coord": {
        "lon": -85.3097,
        "lat": 35.0456
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 73.8,
        "feels_like": 73.74,
        "temp_min": 70.14,
        "temp_max": 76.35,
        "pressure": 1024,
        "humidity": 61
    },
    "visibility": 10000,
    "wind": {
        "speed": 4,
        "deg": 104,
        "gust": 8.01
    },
    "clouds": {
        "all": 75
    },
    "dt": 1622561317,
    "sys": {
        "type": 2,
        "id": 2004455,
        "country": "US",
        "sunrise": 1622543309,
        "sunset": 1622595007
    },
    "timezone": -14400,
    "id": 4612862,
    "name": "Chattanooga",
    "cod": 200
}
```


### Contributor
[Chris Meffley](https://github.com/cmeffley)
