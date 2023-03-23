const c = document.getElementById('bg-canvas');
const ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;


const cursor = {
	x:0,
	y:0
}

document.body.addEventListener('mousemove',e=>{
	cursor.x = e.clientX;
	cursor.y = e.clientY;
})


class Particle {
	static list = [];
	static count = 25;

	constructor() {
		this.x = Math.random() * c.width;
		this.y = Math.random() * c.height;
		this.vx = 0;
		this.vy = 0;

		this.constructor.list.push(this);
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
		ctx.fill();
	}

	update() {

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