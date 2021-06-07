# Front End Capstone - 'Trainer'

### Motivation
I want to create an application that will help someone train for a race or create a workout plan with an end date/goal. I thoroughly enjoy racing, whether it's cycling, triathlon or running, and although there are a ton of apps already created for this, I would love to try and create my own version. Organizing and planning workouts are key to succeeding in your goals and my hope is that this application will help users succeed.

### [Deployed Site](https://cm-trainer.netlify.app/)

## Planning
### [ERD](https://dbdiagram.io/d/60b2709bb29a09603d171b11)

### [Wireframe](https://www.figma.com/file/n0zW9BFw5XAbdPBJ1HBnHb/Capstone-Trainer?node-id=2%3A56)

### [User Flow Chart](https://docs.google.com/presentation/d/1QfsY9q46uwuG7AlJHKZR17Vm-mnCdS1AT9MYEFbkwn8/edit?usp=sharing)

### [Project Board](https://github.com/cmeffley/front-end-capstone/projects/1)

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
