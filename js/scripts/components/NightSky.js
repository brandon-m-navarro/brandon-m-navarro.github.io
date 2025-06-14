// NightSky Component
//
//   This component creates an svg which animates both stars slowly drifting,
//   as well as occasional shooting stars. It is intended to be used as a
//   background for the main content of the page.
//
//   This file also defines the Particle and ShootingStar classes, which are used
//   to represent the stars and shooting stars respectively.
//
//   The Particle class is a basic particle with position, velocity, and radius.
//   The ShootingStar class extends Particle and adds properties for opacity,
//   trail length, and state (spawning, dying, dead).
//

"use strict";

// Import BaseComponent and utility functions
import BaseComponent from "../BaseComponent.js";
import {lineToAngle, randomRange, degreesToRads} from "../utils/Utilities.js";

// Global variables
const

    // starsAngle: Angle in degrees at which the shooting stars travel
    starsAngle = 145,

    // shootingStarSpeed: Object with min and max speed for shooting stars
    shootingStarSpeed = {
        min: 15,
        max: 20
    },

    // shootingStarOpacityDelta: Delta for opacity change per frame
    shootingStarOpacityDelta = 0.01,

    // trailLengthDelta: Delta for trail length change per frame
    trailLengthDelta = 0.01,

    // shootingStarEmittingInterval: Interval in milliseconds for spawning new shooting stars
    shootingStarEmittingInterval = 5000,

    // shootingStarLifeTime: Lifetime in milliseconds for each shooting star
    shootingStarLifeTime = 500,

    // maxTrailLength: Maximum length of the shooting star's trail
    maxTrailLength = 300,

    // starBaseRadius: Base radius for non-shooting stars
    starBaseRadius = 2,

    // shootingStarRadius: Radius for shooting stars
    shootingStarRadius = 3,

    // Layers of stars with different speeds, scales, and counts
    // Each layer has a speed, scale, and count of stars
    //   speed: Speed of the stars in pixels per frame
    //   scale: Scale factor for the size of the stars
    //   count: Number of stars in this layer
    layers = [
        { speed: 0.0175, scale: 0.25,  count: 350 },
        { speed: 0.03,  scale: 0.55,  count: 50 },
        { speed: 0.05,  scale: 0.75, count: 35 }
    ];

/**
 * Particle class representing a basic particle with position, velocity, and radius.
 * Provides methods to get and set speed and heading, and to update position.
 */
/**
 * @class Particle
 * @param {Object} options - Options for initializing the particle.
 * @param {number} [options.x=0] - The x-coordinate of the particle.
 * @param {number} [options.y=0] - The y-coordinate of the particle.
 * @param {number} [options.vx=0] - The x-component of the particle's velocity.
 * @param {number} [options.vy=0] - The y-component of the particle's velocity.
 * @param {number} [options.radius=0] - The radius of the particle.
 */
class Particle {
    constructor (options) {

        // Specify default values if options aren't specified
        this.defaultOptions = {
            x:      0,
            y:      0,
            vx:     0,
            vy:     0,
            radius: 0
        };

        // Initialize parameters
        this.x = 'x' in options
            ? options.x : this.defaultOptions.x;
        this.y = 'y' in options
            ? options.y : this.defaultOptions.y;
        this.vx = 'vx' in options
            ? options.vx : this.defaultOptions.vx;
        this.vy = 'vy' in options
            ? options.vy : this.defaultOptions.vy;
        this.radius = 'radius' in options
            ? options.radius : this.defaultOptions.radius;
    }

    /**
     * @method getSpeed - Returns the speed of the particle.
     * @returns {number} The speed of the particle.
     */
    getSpeed () {
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    }

    /**
     * @method setSpeed - Sets the speed of the particle.
     * @param {number} speed - The new speed of the particle.
     */
    setSpeed (speed) {
        var heading = this.getHeading();
        this.vx = Math.cos(heading) * speed;
        this.vy = Math.sin(heading) * speed;
    }

    /**
     * @method getHeading - Returns the heading of the particle in radians.
     * @returns {number} The heading of the particle in radians.
    */
    getHeading () {
        return Math.atan2(this.vy, this.vx);
    }

    /**
     * @method setHeading - Sets the heading of the particle.
     * @param {number} heading - The new heading of the particle in radians.
     */
    setHeading (heading) {
        var speed = this.getSpeed();
        this.vx = Math.cos(heading) * speed;
        this.vy = Math.sin(heading) * speed;
    }

    /**
     * @method update - Updates the position of the particle based on its
     *                  velocity.
     */
    update () {
        this.x += this.vx;
        this.y += this.vy;
    }
};


/**
 * ShootingStar class representing a shooting star particle.
 * Inherits from Particle and adds properties for opacity, trail length, and state.
 * Provides methods to manage the shooting star's lifecycle (spawning, dying, dead).
 * @extends Particle
 */
/**
 * @class ShootingStar
 * @param {Object} options - Options for initializing the shooting star.
 * @param {number} [options.opacity=0] - The opacity of the shooting star (0.0 - 1.0).
 * @param {number} [options.trailLengthDelta=0] - Multiplier for the maximum trail length (0.0 - 1.0).
 *                                                This determines the current trail length as
 *                                                (maxTrailLength * trailLengthDelta).
 * @param {boolean} [options.isSpawning=false] - Indicates if the shooting star is spawning
 *                                               (opacity is increasing from 0.0 to 1.0).
 * @param {boolean} [options.isDying=false] - Indicates if the shooting star is dying.
 * @param {boolean} [options.isDead=false] - Indicates if the shooting star is dead.
 */
class ShootingStar extends Particle {
    constructor (options) {
        super(options);

        // Specify default values if options aren't specified
        let defaultOptions = {
            opacity: 0,
            trailLengthDelta: 0,
            isSpawning: true,
            isDying: false,
            isDead: false
        };


        // Initialize parameters
        this.opacity = 'opacity' in options
            ? options.opacity
            : defaultOptions.opacity;
        this.trailLengthDelta = 'trailLengthDelta' in options
            ? options.trailLengthDelta
            : defaultOptions.trailLengthDelta;
        this.isSpawning = 'isSpawning' in options
            ? options.isSpawning
            : defaultOptions.isSpawning;
        this.isDying = 'isDying' in options
            ? options.isDying
            : defaultOptions.isDying;
        this.isDead = 'isDead' in options
            ? options.isDead
            : defaultOptions.isDead;
    }
}

export default class NightSky extends BaseComponent {
    constructor (options) {
        super();
        
        // Specify default values if options aren't specified
        let defaultOptions = {
            bg: "#282A3A"
        };
        
        // If options are provided, use them; otherwise, use default options
        if (typeof options == 'undefined') {
            options = defaultOptions;
        }

        // Create boolean indicating whether the animation is paused
        this.paused = true;

        // Initialize parameters
        this.bg = 'bg' in options
            ? options.bg
            : defaultOptions.bg;

        // Array to hold stars
        this.stars = [];

        // Array to hold shooting stars
        this.shootingStars = [];

        // Create DOM elements
        this.canvas = window.document.createElement('canvas');
        this.context = this.canvas.getContext("2d");

        // Set the width and height of the canvas to match the window size
        // (these are re-calculated when the component starts)
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;

        // Assemble
        this.div.appendChild(this.canvas);

        // Style
        this.div.setAttribute('id', 'night-sky-div');
        this.canvas.setAttribute('id', 'canvas');    
    }

    /**
     * Pauses the animation loop and clears the canvas.
     * This method sets the paused state to true and clears the canvas
     * by filling it with a transparent rectangle.
     */
    hide () {
        this.paused = true;
        this.context.clearRect(0, 0, this.width, this.height);
    }

    /**
     * Draws a star on the canvas.
     * The star is drawn as a filled circle with a specified radius.
     * The color of the star is set to a light orange color.
     * @param {Particle} star - The star to draw.
     */
    drawStar (star) {
        this.context.fillStyle = "rgb(255, 221, 157)";
        this.context.beginPath();
        this.context.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        this.context.fill();
    }

    /**
     * Draws a shooting star on the canvas.
     * @param {ShootingStar} p - The shooting star to draw.
     */
    drawShootingStar (p) {
        let x = p.x,
            y = p.y,
            currentTrailLength = (maxTrailLength * p.trailLengthDelta),
            pos = lineToAngle(x, y, -currentTrailLength, p.getHeading());

        this.context.fillStyle = "rgba(255, 255, 255, " + p.opacity + ")";

        let starLength = 5;
        this.context.beginPath();
        this.context.moveTo(x - 1, y + 1);

        this.context.lineTo(x, y + starLength);
        this.context.lineTo(x + 1, y + 1);

        this.context.lineTo(x + starLength, y);
        this.context.lineTo(x + 1, y - 1);

        this.context.lineTo(x, y + 1);
        this.context.lineTo(x, y - starLength);

        this.context.lineTo(x - 1, y - 1);
        this.context.lineTo(x - starLength, y);

        this.context.lineTo(x - 1, y + 1);
        this.context.lineTo(x - starLength, y);

        this.context.closePath();
        this.context.fill();

        // Draw the trail
        this.context.fillStyle = "rgba(255, 221, 157, " + p.opacity + ")";
        this.context.beginPath();
        this.context.moveTo(x - 1, y - 1);
        this.context.lineTo(pos.x, pos.y);
        this.context.lineTo(x + 1, y + 1);
        this.context.closePath();
        this.context.fill();
    }

    /**
     * The update function is called repeatedly to animate the stars and
     * shooting stars. It clears the canvas, fills the background, updates
     * the positions of stars and shooting stars, and draws them on the
     * canvas. It also handles the spawning and dying of shooting stars.
     * If a shooting star goes out of bounds, it is reset to the opposite
     * side of the canvas. Dead shooting stars are removed from the array.
     */
    update () {
        if (!this.paused) {
            this.context.clearRect(0, 0, this.width, this.height);
            this.context.fillStyle = this.bg;
            this.context.fillRect(0, 0, this.width, this.height);
            this.context.fill();

            // Update and draw stars
            for (let i=0; i<this.stars.length; i++) {
                let star = this.stars[i];
                star.update();
                this.drawStar(star);
                if (star.x > this.width) {
                    star.x = 0;
                }
                if (star.x < 0) {
                    star.x = this.width;
                }
                if (star.y > this.height) {
                    star.y = 0;
                }
                if (star.y < 0) {
                    star.y = this.height;
                }
            }

            // Update and draw shooting stars
            for (let i=0; i<this.shootingStars.length; i++) {
                let shootingStar = this.shootingStars[i];
                if (shootingStar.isSpawning) {
                    shootingStar.opacity += shootingStarOpacityDelta;
                    if (shootingStar.opacity >= 1.0) {
                        shootingStar.isSpawning = false;
                        this.killShootingStar(shootingStar);
                    }
                }

                // If shooting star is dying, decrease opacity. Once opacity
                // reaches 0, mark it as dead
                if (shootingStar.isDying) {
                    shootingStar.opacity -= shootingStarOpacityDelta;
                    if (shootingStar.opacity <= 0.0) {
                        shootingStar.isDying = false;
                        shootingStar.isDead = true;
                    }
                }

                // Update position of shooting star
                shootingStar.trailLengthDelta += trailLengthDelta;
                shootingStar.update();

                // Draw the shooting star
                if (shootingStar.opacity > 0.0) {
                    this.drawShootingStar(shootingStar);
                }
            }

            // Delete dead shooting shootingStars
            for (let i=this.shootingStars.length-1; i>=0; i--){
                if (this.shootingStars[i].isDead){
                    this.shootingStars.splice(i, 1);
                }
            }
        }
        requestAnimationFrame(this.update.bind(this));
    };

    /**
     * Creates a new shooting star with a random position, speed, and heading.
     * The shooting star is initialized with a random x-coordinate in the right
     * half of the canvas, a random y-coordinate in the top half of the canvas,
     * and a radius. The speed is set to a random value between the specified
     * minimum and maximum speeds, and the heading is set to a fixed angle in
     * radians.
     */
    createShootingStar () {
        let shootingStar = new ShootingStar({
                x: randomRange(this.width / 2, this.width),
                y: randomRange(0, this.height / 2),
                radius: shootingStarRadius,
                opacity: 0,
                isSpawning: true,
            });
        shootingStar.setSpeed(
            randomRange(shootingStarSpeed.min, shootingStarSpeed.max)
        );
        shootingStar.setHeading(degreesToRads(starsAngle));
        this.shootingStars.push(shootingStar);
    }

    /**
     * @method killShootingStar
     * @param {ShootingStar} shootingStar - The shooting star to kill.
     * This method sets a timeout to change the shooting star's isDying
     * property to true after a specified lifetime, causing it to fade out.
     */
    killShootingStar (shootingStar) {
        setTimeout(() => {
            shootingStar.isDying = true;
        }, shootingStarLifeTime);
    }

    /**
     * Starts the animation by initializing the canvas size, creating stars,
     * and starting the animation loop. It also sets up an interval to create
     * shooting stars at regular intervals.
     */
    start () {

        // Set width and height of the canvas to match the window size
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;

        // Ensure the animation is not paused
        this.paused = false;

        // Create all non-shooting stars. Location is randomized within canvas
        // dimensions; speed, size, & count are determined above in 'layers'
        // object.
        for (let j=0; j<layers.length; j++) {
            var layer = layers[j];
            for (var i=0; i<layer.count; i++) {
                let radius = starBaseRadius * layer.scale,
                    star = new Particle({
                        x: randomRange(0, this.width),
                        y: randomRange(0, this.height),
                        radius: radius
                    });
                star.setSpeed(layer.speed);
                star.setHeading(degreesToRads(starsAngle));
                this.stars.push(star);
            }
        }

        // Start the animation loop
        this.update();

        // Create a ShootingStar every `shootingStarEmittingInterval` milliseconds
        setInterval(() => {
            if (this.paused) return;
            this.createShootingStar();
        }, shootingStarEmittingInterval);
    }
}
