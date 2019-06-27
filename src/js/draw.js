import '../css/font-awesome-4.7.0/fonts/fontawesome-webfont.eot'
import '../css/font-awesome-4.7.0/fonts/fontawesome-webfont.svg'
import '../css/font-awesome-4.7.0/fonts/fontawesome-webfont.ttf'
import '../css/font-awesome-4.7.0/fonts/fontawesome-webfont.woff'
import '../css/font-awesome-4.7.0/fonts/fontawesome-webfont.woff2'
import '../css/font-awesome-4.7.0/fonts/FontAwesome.otf'
import '../css/font-awesome-4.7.0/css/font-awesome.min.css';

import * as d3 from 'd3';
import colors from './colors.js';

let STATIC_PATH = ENV === 'development' ? '../../data/' : './data/'
console.log(STATIC_PATH)

function draw(Data){
	
	/***********
	STARTER CODE
	***********/

	let states = ['va', 'md', 'dc'];
	let fullstate = {'md':'Maryland', 'va':'Virginia', 'dc':'District of Columbia'}

	let width = parseInt(d3.select('#chartwrapper').style("width")),
	height = d3.select('#chartwrapper').node().offsetHeight;

	let isMobile = width < 620;

	for (let i = 0; i < states.length; i++){
		let state = states[i]
	
		let bills = d3.csv(`${STATIC_PATH}${state}_bills_with_actions.csv`, (error, data) => {
			if (error) throw error;
			
			data = data.map(d => {
				let passed = d['outcome'] === 'bill passed' | 
					d['outcome'] === 'passed (with or without amendments) and signed by governor' | 
					d['outcome'] === 'passed, vetoed by governor, veto overridden by state lege'

				d['passed'] = passed ? 'passed' : 'unpassed'
				return d
			})

			let tooltip = d3.select("#tooltip");

			let stateDiv = d3.select("#chartwrapper")
				.append('div')
				.attr('class', 'state-div')
				.attr('id', `${state}-div`)
				.html(`<div class="state-name">${fullstate[state]}</div>`)

			let byImpactBySession = d3.nest()
				.key(d => d['session'])
				.key(d => d['designated_env_impact'])
				.key(d => d['passed'])
				.entries(data);

			let sessionDiv = stateDiv.selectAll('.session-div')
				.data(byImpactBySession).enter()
				.append('div').attr('class', e => `session-div`)
				.sort((a, b) => d3.descending(+a.key, +b.key))
				.html(d => '<div class="session-label">' + d.key + '</div><div class="bills-cont"></div>');

			let impactDiv = sessionDiv.select('.bills-cont').selectAll('.impact-div')
				.data(d => d.values).enter()
				.append('div').attr('class', e => `impact-div ${e.key}-cont`)
				.sort((a, b) => d3.descending(a.key, b.key));

			let outcomeDiv = impactDiv.selectAll('.outcome-div')
				.data(d => d.values).enter()
				.append("div").attr("class", e => `outcome-div ${e['key']}-cont`)
				.sort((a, b) => d3.ascending(a.key, b.key));

			let billDiv = outcomeDiv.selectAll('.bill-div')
				.data(d => d.values).enter()
				.append('a')
				.attr('href', d => isMobile ? '#' : d['link'])
				.attr('target', isMobile ? '_self' : '_blank')
				.append('div').attr('class', 'bill-div')
				.on('mouseover', function (d) {
					let billCirc = d3.select(this)
					billHover(d, billCirc)
				})
				.on('mouseout', function (d) {
					let billCirc = d3.select(this)
					billMouseOut(d, billCirc)
				})

			
			let billHover = function(d, billCirc) {
				let natleft = billCirc.node().offsetLeft + 15
				let nattop = billCirc.node().offsetTop + 15
				height = d3.select('#chartwrapper').node().offsetHeight

				tooltip.style('display', 'block');

				let orgsString = d['organization'] !== ''  ? 
					`<div class="tip-bill-groups">Advocacy organizations determining: ${d['organization']}</div>` :
					''

				let outcomeString = `<div class="tip-outcome">Outcome: ${d['outcome']}</div>`

				let linkString = isMobile ? `<a href=${d['link']} target="_blank" class="read-more">Read more</a>` : ''

				tooltip.html(`<div class="tip-bill-title">${d['name']}</div>` + 
					`<div class="tip-bill-id">${d['bill_id']}</div>` + 
					outcomeString +
					orgsString + 
					linkString
					)

				let right = tooltip.node().offsetWidth + natleft
				let bottom = tooltip.node().offsetHeight + nattop
				let left = right >= width ? width - tooltip.node().offsetWidth : natleft;
				let top = bottom >= height ? height - tooltip.node().offsetHeight - 25 : nattop;

				tooltip.transition()
					.style('left', left + 'px')
					.style('top', top + 'px')
			}

			let billMouseOut = function(d, billCirc) {

				tooltip
					.transition()
					.delay(700)
					.style('display', 'none');
			}


			console.log(byImpactBySession)

		})
	}

	//append all chart elements to g variable
	//happy coding!
		
};

export default draw;
