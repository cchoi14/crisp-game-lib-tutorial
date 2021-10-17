title = "TRICKSHOT";

description = `
MOUSE = AIM
CLICK = SHOOT
RED BALL FIRST
`;

characters = [
`
  rr
 rrrr
rrrrrr
rrrrrr
 rrrr
  rr  
`,`
  ll
 llll
llllll
llllll
 llll
  ll
`,`
  yy
 yyyy
yyyyyy
yyyyyy
 yyyy
  yy
`];

const G = {
	WIDTH: 100,
	HEIGHT: 100,
	BORDER_PADDING: 10,
    CLICKABLE: false // tracks 'player turn'

};

options = {
    viewSize: {x: G.WIDTH, y: G.HEIGHT},
    isCapturing: true,
    isCapturingGameCanvasOnly: true,
    captureCanvasScale: 2,
    seed: 1,
    isPlayingBgm: true,
    isReplayEnabled: true,
    theme: "dark"
};

/**
* @typedef {{
* pos: Vector,
* speed: number,
* angle: number}} Ball
*/
let rBall;
let wBall;

/**
* @type  { Ball [] }
*/
let yBalls;

/**
 * @typedef {{
 * pos: Vector,
 * speed: number
 * }} Cue
 */
let cue;

/**
 * @typedef {{
 * pos1: Vector,
 * pos2: Vector
 * }} Wall
 */

/**
* @type  { Wall [] }
*/
let borders;
let walls;

function update() {
	if (!ticks) {
        reset();
	}
    if (!G.CLICKABLE && (wBall.speed = 0) && (rBall.speed = 0)) {
        reset();
    }

    if (G.CLICKABLE && input.isJustReleased) {
        G.CLICKABLE = false;
        cue.angle = cue.pos.angleTo(wBall.pos);
        cue.speed = Math.hypot(cue.pos.x - wBall.pos.x, cue.pos.y - wBall.pos.y);
    }
    // draw borders
    color ("black");
    line(G.BORDER_PADDING, G.BORDER_PADDING, G.WIDTH - G.BORDER_PADDING, G.BORDER_PADDING, 3);
    color ("black");
    line(G.BORDER_PADDING, G.HEIGHT - G.BORDER_PADDING, G.WIDTH - G.BORDER_PADDING, G.HEIGHT - G.BORDER_PADDING, 3);
    color ("black");
    line(G.BORDER_PADDING, G.BORDER_PADDING, G.BORDER_PADDING, G.HEIGHT - G.BORDER_PADDING, 3);
    color ("black");
    line(G.WIDTH - G.BORDER_PADDING, G.BORDER_PADDING, G.WIDTH - G.BORDER_PADDING, G.HEIGHT - G.BORDER_PADDING, 3);
    
    // draw cue
    if (cue.speed > 0) {
        cue.pos.x += cue.speed * Math.cos(cue.angle);
        cue.pos.y += cue.speed * Math.sin(cue.angle);
        cue.speed--;
    } else if (cue.speed < 0) {
        cue.speed = 0;
    }

    if (G.CLICKABLE) {
        cue.pos = vec(input.pos.x, input.pos.y);
        cue.pos.clamp(G.BORDER_PADDING + 2, G.WIDTH - G.BORDER_PADDING - 3, G.BORDER_PADDING + 2, G.HEIGHT - G.BORDER_PADDING - 3);
    }
    color ("purple");
    box(cue.pos, 2);
    color ("purple");
    line(cue.pos, wBall.pos, 1);

    // draw white ball
    color ("black");
    char("b", wBall.pos);

    // draw yellow balls
    yBalls.forEach((yb) => {
        color ("black");
        char("c", yb.pos);
    });

    // draw red ball
    color ("black");
    char("a", rBall.pos);
}

function reset() {
    yBalls = times(5, () => {
        const posX = rnd(G.BORDER_PADDING + 4, G.WIDTH - G.BORDER_PADDING - 4);
        const posY = rnd(G.BORDER_PADDING + 4, G.HEIGHT - G.BORDER_PADDING - 4);
        return {
            pos: vec(posX, posY),
            speed: 0,
            angle: 0
        };
    });
    rBall = {
        pos: vec(rnd(G.BORDER_PADDING + 4, G.WIDTH - G.BORDER_PADDING - 4), rnd(G.BORDER_PADDING + 4, G.HEIGHT - G.BORDER_PADDING - 4)),
        speed: 0,
        angle: 0
    };

    wBall = {
        pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.7),
        speed: 0,
        angle: 0
    };
    cue = {
        pos: vec(input.pos.x, input.pos.y)
    };
    G.CLICKABLE = true;
}