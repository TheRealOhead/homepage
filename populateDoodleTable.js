class Doodle {
	constructor(name,desc,link) {
		this.name = document.createElement('td');
		this.name.classList.add('doodle-name');
		this.name.innerHTML = name;

		this.desc = document.createElement('td');
		this.desc.classList.add('doodle-desc');
		this.desc.innerHTML = desc;
		
		this.link = link;
	}

	populate() {
		let row = document.createElement('tr');
		let anchor = document.createElement('a');
		anchor.href = this.link;
		anchor.appendChild(this.name);
		row.appendChild(anchor);
		row.appendChild(this.desc);

		table.appendChild(row);
	}
}

const table = document.getElementById('doodle-table');

const doodles = [
	new Doodle('Cookie Clicker Gift Code Editor','<a href="https://orteil.dashnet.org/cookieclicker">Cookie Clicker</a> has a gift code feature. I made an editor for them','https://therealohead.github.io/cookie-clicker-gift-code-editor/'),
	new Doodle('Matcher','A simple enough block-break puzzle game','https://therealohead.github.io/matcher/'),
	//new Doodle('Cesspool Online','A horrible social media site where everyone\'s anonymous','http://cesspoolonline.xyz/'),
	new Doodle('Conway\'s Game of Life','My implementation of Conway\'s Game of Life','https://therealohead.github.io/cgol/'),
	//new Doodle('Tax TD','An unfinished demo for a tower defense game about not paying taxes','https://therealohead.github.io/tax-td/'),
	new Doodle('Neverending Legacy Mods','A collection of mods I made for Orteil\'s other game: <a href="https://orteil.dashnet.org/legacy">Neverending Legacy</a>','https://therealohead.github.io/neverending-legacy-mods'),
	new Doodle('Dancing Letters','Y\'know those goofy dancing letter gifs? I made a page that displays those for whatever you type','https://therealohead.github.io/dancing-letters'),
	new Doodle('Site Background','Just the background of this site to play around with the little orbiting dots (Doesn\'t work on mobile)','./justBackground.html')
]


doodles.forEach(d=>{d.populate()})