#Angular Splash Loader

A pretty loader that shows a configurable messages while a certain logo uses a spin effect.

#Getting Started

`bower install angular-splash-loader`


Include css and js in your index.html

* src/css/angular-splash-loader.css
* src/js/angular-splash-loader.js


#Usage

Add the module `ngSplashLoader` in you main module app

```javascript
  angular
    .module('your_main_module', ['ngSplashLoader'])
  
```

Use it in your controller injecting `SplashLoader` service.

```javascript
  angular
    .module('your_module')
    .controller(['SplashLoader', function(SplashLoader){
      
        //Open the splash loader
        SplashLoader.open();


        //Close the splash loader
        SplashLoader.close();
    
    }])
```
  
#Roadmap

0.0.1 
  - Basic functionality of splashLoader

0.0.2 

  - Add gruntfile for development
  - Add more options for modify the behaviour of the css

0.0.3
  
  - Add testing
  - Add template option