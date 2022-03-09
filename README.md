# musa-611-midterm

Author: Shaun Zheng

This is the map about pet dogs in New York City.

1. How many dog runs are within New York City and where are they?

2. What kinds of dog breed are favored by New Yorkers?
3. Where can New Yorkers access the pet supply stores?

These are three questions wanted be answered in this project.

### Preparation

#### Step 1: Prepare Geographic Data

* Data Resources: NYC Open Data, Census Data, Open Street Map Data
* NYC Open Data: Dog Runs, Dog Licensing
* Census Data: Translator of Zip Code to Geolocations 
* Open Street Map Data: Pet Supply Stores

#### Step 2: Slide Content

Your story will have multiple slides, each with a title, some additional text, maybe images, and geographic data. It might also need to contain information about how you will filter or style the data for that particular slide. This kind of structure is another type of data.

How will you represent this data that is about the slides? In slides.js, write a brief example that shows what the data for one slide might look like. Think about how it will be stored and read in Javascript (arrays, objects, etc.).

#### Step 3: App Behavior

What do you want the map or the data on the map to do when you go to a different
slide?

- Should it pan and zoom to specific features?
- Should it highlight or show a popup on any features?
- Should the features shown be filtered?

Think about what you want/need your application to do. It's often helpful to
frame these app behaviors in a "When... then..." format. For example:

- When I click the "⧏" button, then the app should show the slide before the
  current one.
- When I click the "⧐" button, then the app should show the slide after the
  current one.
- When the page loads, then the app should show the first slide.

These behavior descriptions can help you determine what functions you need to
write. For example, the behaviors above imply that you should have functions to
handle the next/previous button clicks, and a function to show a given slide.

#### Step 3: Function Signatures

It can be helpful to step back and think about the project before starting to write any code.

In your index.js file, write short descriptions of the functions that will make up your application. You don't need to write any of the code inside the functions (yet) — just think about what the functions will do, what parameters you will pass to them, and what they will return. Write comments inside of the functions detailing the steps that you want to happen when the function runs.

For example:

```js
function showSlide(...) {
  /*
    This function should:
    1: accept some slide data as the input
    2: show the content of the slide data
    3: filter the map for according the slide filters
    4: ...
  */
}
```

#### Step 4: Start writing!