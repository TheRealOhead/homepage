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
	new Doodle('Cookie Clicker Gift Code Editor','The current <a href="https://orteil.dashnet.org/cookieclicker/beta">beta version of Cookie Clicker</a> has a gift code feature. I made an editor for them','https://therealohead.github.io/cookie-clicker-gift-code-editor/'),
	new Doodle('Matcher','A simple enough block-break puzzle game','https://therealohead.github.io/matcher/'),
	new Doodle('Tax TD','An unfinished demo for a tower defense game about not paying taxes','https://therealohead.github.io/tax-td/'),
	new Doodle('2023 Last Day of School Countdown (DHS seniors)','For my high-school senior friends :)','https://therealohead.github.io/2023-eos/?senior'),
	new Doodle('2023 Last Day of School Countdown (DHS non-seniors)','For my high-school non-senior friends :)','https://therealohead.github.io/2023-eos'),
	new Doodle('Neverending Legacy Mods','A collection of mods I made for Orteil\'s other game: <a href="https://orteil.dashnet.org/legacy">Neverending Legacy</a>','https://therealohead.github.io/neverending-legacy-mods'),
	new Doodle('Dancing Letters','Y\'know those goofy dancing letter gifs? I made a page that displays those for whatever you type','https://therealohead.github.io/dancing-letters'),
	new Doodle('Site Background','Just the background of this site to play around with the little orbiting dots (Doesn\'t work on mobile)','./justBackground.html')
]


doodles.forEach(d=>{d.populate()})