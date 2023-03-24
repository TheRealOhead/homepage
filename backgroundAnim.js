const c = document.getElementById('bg-canvas');
const ctx = c.getContext('2d');

function resize() {
	c.width = window.innerWidth;
	c.height = window.innerHeight;
}
addEventListener('resize', () => {
	resize();
});
resize();

const date = new Date();
const month = date.getMonth() + 1;
const day = date.getDate();


let holidays = [
	{ // Christmas
		isToday:month == 12 && day <= 25,
		colors:['red','green']
	},
	{ // Halloween
		isToday:month == 10 && day == 31,
		colors:['orange','purple']
	},
	{ // My Birthday!
		isToday:month == 1 && day == 19,
		colors:['cyan','orange']
	},
	{ // April Fools Day
		isToday:month == 4 && day == 1,
		colors:['white']
	},
	{ // Fourth of July
		isToday:month == 7 && day == 4,
		colors:['red','white','blue']
	},
	{ // St. Patrick's Day
		isToday:month == 3 && day == 17,
		colors:['orange','green']
	},
	{ // Pride month
		isToday:month == 6,
		colors:['red','orange','yellow','green','blue','purple']
	}
]


const cursor = {
	x:undefined,
	y:undefined,
	clicked:false
}
document.body.addEventListener('mousemove',e=>{
	cursor.x = e.clientX;
	cursor.y = e.clientY;
})
document.body.addEventListener('mousedown',e=>{cursor.clicked = true});
document.body.addEventListener('mouseup',e=>{cursor.clicked = false});


let doGravity = false;
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
let konamiIndex = 0;

document.body.addEventListener('keydown',e=>{
	if (e.key == konami[konamiIndex]) {
		konamiIndex++;
	} else {
		konamiIndex = 0;
	};
	if (konamiIndex == konami.length) {
		doGravity = !doGravity;
		konamiIndex = 0;
	}
});

class Particle {
	static list = [];
	static count = 25;
	friction = .99;
	wallFriction = .75;
	radius = (month == 4 && day == 1) ? Math.random() * 120 + 2 : 2;
	id = undefined;

	constructor() {
		this.x = Math.random() * c.width;
		this.y = Math.random() * c.height;
		this.vy = 0;
		this.vx = 0;

		this.id = this.constructor.list.length;

		this.constructor.list.push(this);
	}

	draw() {

		// Apply color for holiday
		holidays.forEach(h=>{
			if (h.isToday)
				ctx.fillStyle = h.colors[this.id % h.colors.length];
		})

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fill();
	}

	update() {

		if (cursor.x == undefined || cursor.y == undefined) return;
		
		// This is horrifying
		let directionToCursor = Math.atan2(cursor.y-this.y, cursor.x-this.x);

		if (!doGravity) {
			// Go toward cursor
			if (!cursor.clicked) {
				this.vy += Math.sin(directionToCursor);
				this.vx += Math.cos(directionToCursor);
			}
			// Go away from cursor
			else {
				this.vy -= Math.sin(directionToCursor);
				this.vx -= Math.cos(directionToCursor);
			}
		} else {
			this.vy += .4;
		}


		// Bounce off walls
		if (this.y < this.radius) this.vy = Math.abs(this.vy) * this.wallFriction;
		if (this.x < this.radius) this.vx = Math.abs(this.vx) * this.wallFriction;
		if (this.y > c.height - this.radius) this.vy = -Math.abs(this.vy) * this.wallFriction;
		if (this.x > c.width - this.radius) this.vx = -Math.abs(this.vx) * this.wallFriction;
		


		// Apply friction
		this.vx *= this.friction;
		this.vy *= this.friction;
		

		// Apply velocity
		this.x += this.vx;
		this.y += this.vy;

		
	}

	static drawAll() {
		this.list.forEach(p=>{
			ctx.fillStyle = 'white';
			p.draw();
			ctx.fillStyle = '';
		})
	}

	static updateAll() {
		this.list.forEach(p=>{
			p.update();
		})
	}

	static make() {
		if (/Android|iPhone/i.test(navigator.userAgent)) { // Disable on mobile
			return;
		}

		for (let i = 0; i < this.count; i++) {
			new this();
		}
	}
}

Particle.make();


function animate() {



	ctx.clearRect(0,0,c.width,c.height);

	Particle.drawAll();
	Particle.updateAll();

	requestAnimationFrame(animate);
}
requestAnimationFrame(animate)