title = "TRICKSHOT";

description = `CLICK : AIM
HOLD : CHARGE
`;

characters = [
`
  rr
 rrrr
rrrrrr
rrrrrr
 rrrr
  rr  
`
];

const G = {
	WIDTH: 100,
	HEIGHT: 100,
	STAR_SPEED_MIN: 0.5,
	STAR_SPEED_MAX: 1.0
};

options = {
        viewSize: {x: G.WIDTH, y: G.HEIGHT}
};

/**
* @typedef {{
* pos: Vector,
* speed: number
* }} Star
*/

/**
* @type  { Star [] }
*/
let stars;

/**
 * @typedef {{
 * pos: Vector,
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

function update() {
	if (!ticks) {
		        // A CrispGameLib function
        // First argument (number): number of times to run the second argument
        // Second argument (function): a function that returns an object. This
        // object is then added to an array. This array will eventually be
        // returned as output of the times() function.
		stars = times(20, () => {
            // Random number generator function
            // rnd( min, max )
            const posX = rnd(0, G.WIDTH);
            const posY = rnd(0, G.HEIGHT);
            // An object of type Star with appropriate properties
            return {
	            // Creates a Vector
                pos: vec(posX, posY),
                // More RNG
                speed: rnd(0.5, 1.0)
            };
			return {
				pos: vec(posX, posY),
				speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
			};
		});
		player = {
			pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5)
		};
	}
	player.pos = vec(input.pos.x, input.pos.y);
	color("black");
    char("a", player.pos);
	stars.forEach((s) => {
        // Move the star downwards
        s.pos.y += s.speed;
        // Bring the star back to top once it's past the bottom of the screen
        s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);

        // Choose a color to draw
        color("light_blue");
        // Draw the star as a square of size 1
        box(s.pos, 1);
    });
}
