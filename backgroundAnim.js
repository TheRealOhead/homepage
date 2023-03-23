const c = document.getElementById('bg-canvas');
const ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;


const cursor = {
	x:undefined,
	y:undefined
}

document.body.addEventListener('mousemove',e=>{
	cursor.x = e.clientX;
	cursor.y = e.clientY;
})


class Particle {
	static list = [];
	static count = 25;
	friction = .99;

	constructor() {
		this.x = Math.random() * c.width;
		this.y = Math.random() * c.height;
		this.vy = 0;
		this.vx = 0;

		this.constructor.list.push(this);
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
		ctx.fill();
	}

	update() {

		if (cursor.x == undefined || cursor.y == undefined) return;

		// This is horrifying
		let vectorNormal = Math.atan2(cursor.y-this.y, cursor.x-this.x);

		// Bounce off walls
		if (this.y < 0) this.vy = Math.abs(this.vy);
		if (this.x < 0) this.vx = Math.abs(this.vx);
		if (this.y > c.height) this.vy = -Math.abs(this.vy);
		if (this.x > c.width) this.vx = -Math.abs(this.vx);
		
		this.vy += Math.sin(vectorNormal);
		this.vx += Math.cos(vectorNormal);
		this.vx *= this.friction;
		this.vy *= this.friction;
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