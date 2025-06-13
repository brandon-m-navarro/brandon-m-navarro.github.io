// NightSky Component
//
//   This component creates an svg which periodically animates shooting stars
//
//   and twinkling stars in the background. It is intended to be used as a
//   background for the main content of the page.

"use strict";

// Import BaseComponent and utility functions
import BaseComponent from "../BaseComponent.js";
import {lineToAngle, randomRange, degreesToRads} from "../utils/Utilities.js";

// Global variable to control animation loop
//   (true = paused, false = running)
//   This is used to pause the animation when the component is hidden.
let paused = true;

// Particle class
//   This class represents a basic particle with position, velocity, and radius.
//   It provides methods to get and set speed and heading, and to update position.
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
     * @method update - Updates the position of the particle based on its velocity.
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
        this.defaultOptions = {
            opacity: 0,
            trailLengthDelta: 0,
            isSpawning: 0,
            isDying: false,
            isDead: false
        };


        // Initialize parameters
        this.opacity = 'opacity' in options
            ? options.opacity
            : this.defaultOptions.opacity;
        this.trailLengthDelta = 'trailLengthDelta' in options
            ? options.trailLengthDelta
            : this.defaultOptions.trailLengthDelta;
        this.isSpawning = 'isSpawning' in options
            ? options.isSpawning
            : this.defaultOptions.isSpawning;
        this.isDying = 'isDying' in options
            ? options.isDying
            : this.defaultOptions.isDying;
        this.isDead = 'isDead' in options
            ? options.isDead
            : this.defaultOptions.isDead;
    }
}

export default class NightSky extends BaseComponent {
    constructor (options) {
        super();
        
        // Specify default values if options aren't specified
        this.defaultOptions = {
            bg: "#282A3A"
        };
        
        // If options are provided, use them; otherwise, use default options
        if (typeof options == 'undefined') {
            options = this.defaultOptions;
        }

        // Initialize parameters
        this.bg = 'bg' in options
            ? options.bg
            : this.defaultOptions.bg;

        // Create DOM elements
        this.canvas = window.document.createElement('canvas');

        // Assemble
        this.div.appendChild(this.canvas);

        // Style
        this.div.setAttribute('id', 'night-sky-div');
        this.canvas.setAttribute('id', 'canvas');    
    }

    // Pause animation loop and clear canvas (transparent)
    hide () {
        paused = true;
        var context = this.canvas.getContext("2d"),
            width = this.canvas.width = window.innerWidth,
            height = this.canvas.height = window.innerHeight;
        context.clearRect(0, 0, width, height);
    }

    // Resume animation loop and start drawing stars
    start () {

        // Canvas and settings
        let context = this.canvas.getContext("2d"),

            // Set canvas dimensions to fill the window
            width = this.canvas.width = window.innerWidth,
            height = this.canvas.height = window.innerHeight,

            // Array to hold stars
            stars = [],
            // Array to hold shooting stars
            shootingStars = [],
            // Layers of stars with different speeds, scales, and counts
            // Each layer has a speed, scale, and count of stars
            //   speed: Speed of the stars in pixels per frame
            //   scale: Scale factor for the size of the stars
            //   count: Number of stars in this layer
            layers = [
                { speed: 0.015, scale: 0.2, count: 320 },
                { speed: 0.03, scale: 0.5, count: 50 },
                { speed: 0.05, scale: 0.75, count: 30 }
            ],

            // Shooting star settings
            //   starsAngle: Angle in degrees at which the shooting stars travel
            //   shootingStarSpeed: Object with min and max speed for shooting stars
            //   shootingStarOpacityDelta: Delta for opacity change per frame
            //   trailLengthDelta: Delta for trail length change per frame
            //   shootingStarEmittingInterval: Interval in milliseconds for spawning new shooting stars
            //   shootingStarLifeTime: Lifetime in milliseconds for each shooting star
            //   maxTrailLength: Maximum length of the shooting star's trail
            //   starBaseRadius: Base radius for non-shooting stars
            //   shootingStarRadius: Radius for shooting stars
            starsAngle = 145,
            shootingStarSpeed = {
                min: 15,
                max: 20
            },
            shootingStarOpacityDelta = 0.01,
            trailLengthDelta = 0.01,
            shootingStarEmittingInterval = 2000,
            shootingStarLifeTime = 500,
            maxTrailLength = 300,
            starBaseRadius = 2,
            shootingStarRadius = 3;
        paused = false;

        // Create all non-shooting stars. Location is randomized within canvas
        // dimensions; speed, size, & count are determined above in 'layers'
        // object.
        for (let j=0; j<layers.length; j++) {
            var layer = layers[j];
            for (var i=0; i<layer.count; i++) {
                let radius = starBaseRadius * layer.scale,
                    star = new Particle({x: randomRange(0, width), y: randomRange(0, height), radius: radius});
                star.setSpeed(layer.speed);
                star.setHeading(degreesToRads(starsAngle));
                stars.push(star);
            }
        }

        /**
         * Creates a new shooting star with a random position, speed, and heading.
         * The shooting star is initialized with a random x-coordinate in the right half
         * of the canvas, a random y-coordinate in the top half of the canvas, and a radius.
         * The speed is set to a random value between the specified minimum and maximum speeds,
         * and the heading is set to a fixed angle in radians.
         */
        function createShootingStar() {
            var shootingStar = new ShootingStar({
                x: randomRange(width / 2, width),
                y: randomRange(0, height / 2),
                radius: shootingStarRadius,
            })
            shootingStar.setSpeed(randomRange(shootingStarSpeed.min, shootingStarSpeed.max));
            shootingStar.setHeading(degreesToRads(starsAngle));
            shootingStars.push(shootingStar);
        }

        /**
         * Kills a shooting star after a specified lifetime by setting its isDying property to true.
         * The shooting star will gradually fade out by decreasing its opacity.
         */
        function killShootingStar(shootingStar) {
            setTimeout(() => {
                shootingStar.isDying = true;
            }, shootingStarLifeTime);
        }

        /**
         * The update function is called repeatedly to animate the stars and shooting stars.
         * It clears the canvas, fills the background, updates the positions of stars and shooting stars,
         * and draws them on the canvas. It also handles the spawning and dying of shooting stars.
         * If a shooting star goes out of bounds, it is reset to the opposite side of the canvas.
         * Dead shooting stars are removed from the array.
         */
        let update = function () {
            if (!paused) {
                context.clearRect(0, 0, width, height);
                context.fillStyle = this.bg;
                context.fillRect(0, 0, width, height);
                context.fill();

                for (let i=0; i<stars.length; i++) {
                    let star = stars[i];
                    star.update();
                    drawStar(star);
                    if (star.x > width) {
                        star.x = 0;
                    }
                    if (star.x < 0) {
                        star.x = width;
                    }
                    if (star.y > height) {
                        star.y = 0;
                    }
                    if (star.y < 0) {
                        star.y = height;
                    }
                }

                for (let i=0; i<shootingStars.length; i++) {
                    let shootingStar = shootingStars[i];
                    if (shootingStar.isSpawning) {
                        shootingStar.opacity += shootingStarOpacityDelta;
                        if (shootingStar.opacity >= 1.0) {
                            shootingStar.isSpawning = false;
                            killShootingStar(shootingStar);
                        }
                    }
                    if (shootingStar.isDying) {
                        shootingStar.opacity -= shootingStarOpacityDelta;
                        if (shootingStar.opacity <= 0.0) {
                            shootingStar.isDying = false;
                            shootingStar.isDead = true;
                        }
                    }
                    shootingStar.trailLengthDelta += trailLengthDelta;

                    shootingStar.update();
                    if (shootingStar.opacity > 0.0) {
                        drawShootingStar(shootingStar);
                    }
                }

                // Delete dead shooting shootingStars
                for (let i=shootingStars.length-1; i>=0; i--){
                    if (shootingStars[i].isDead){
                        shootingStars.splice(i, 1);
                    }
                }
            }
            requestAnimationFrame(update);
        }.bind(this);

        /**
         * Draws a star on the canvas.
         * The star is drawn as a filled circle with a specified radius.
         * The color of the star is set to a light orange color.
         * @param {Particle} star - The star to draw.
         */
        function drawStar(star) {
            context.fillStyle = "rgb(255, 221, 157)";
            context.beginPath();
            context.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
            context.fill();
        }

        /**
         * Draws a shooting star on the canvas.
         * The shooting star is drawn as a star shape with a trail.
         * The star is filled with a white color with opacity, and the trail is filled
         * with a light orange color with opacity.
         * The star is drawn at the current position of the shooting star, and the trail
         * is drawn from the current position to a position determined by the shooting star's
         * heading and the maximum trail length.
         * @param {ShootingStar} p - The shooting star to draw.
         */
        function drawShootingStar(p) {
            let x = p.x,
                y = p.y,
                currentTrailLength = (maxTrailLength * p.trailLengthDelta),
                pos = lineToAngle(x, y, -currentTrailLength, p.getHeading());

            context.fillStyle = "rgba(255, 255, 255, " + p.opacity + ")";

            let starLength = 5;
            context.beginPath();
            context.moveTo(x - 1, y + 1);

            context.lineTo(x, y + starLength);
            context.lineTo(x + 1, y + 1);

            context.lineTo(x + starLength, y);
            context.lineTo(x + 1, y - 1);

            context.lineTo(x, y + 1);
            context.lineTo(x, y - starLength);

            context.lineTo(x - 1, y - 1);
            context.lineTo(x - starLength, y);

            context.lineTo(x - 1, y + 1);
            context.lineTo(x - starLength, y);

            context.closePath();
            context.fill();

            // Draw the trail
            context.fillStyle = "rgba(255, 221, 157, " + p.opacity + ")";
            // context.lineWidth = 1;
            // context.strokeStyle = "rgba(255, 221, 157, " + p.opacity + ")";
            // context.lineCap = "round";
            // context.lineJoin = "round";
            context.beginPath();
            context.moveTo(x - 1, y - 1);
            context.lineTo(pos.x, pos.y);
            context.lineTo(x + 1, y + 1);
            context.closePath();
            context.fill();
        }


        // Start the animation loop
        update();

        // Create a ShootingStar every `shootingStarEmittingInterval` milliseconds
        setInterval(function() {
            if (paused) return;
            createShootingStar();
        }.bind(this), shootingStarEmittingInterval);
    }
}
