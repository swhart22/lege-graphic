//import _ from 'lodash';
import '../css/nbcotsbase.css';
import * as d3 from 'd3';
import colors from './colors.js';
//import sheetsy from 'sheetsy';
//const {urlToKey, getWorkbook, getSheet } = sheetsy;
//import metadata from './proj-config.js';

function draw(Data){
	
	/***********
	STARTER CODE
	***********/

	let states = ['md', 'va'];
	let fullstate = {'md':'Maryland', 'va':'Virginia'}
	let STATIC_PATH = '../../data/'

	for (let i = 0; i < states.length; i++){
		let state = states[i]
	
		let bills = d3.csv(`${STATIC_PATH}${state}_bills_with_actions.csv`, (error, data) => {
			if (error) throw error;
			// console.log(data)

			let tooltip = d3.select("#tooltip");

			let stateDiv = d3.select("#chartwrapper")
				.append('div')
				.attr('class', 'state-div')
				.attr('id', `${state}-div`)
				.html(`<div class="state-name">${fullstate[state]}</div>`)

			let byImpactBySession = d3.nest()
				.key(d => d['session'])
				.key(d => d['designated_env_impact'])
				.entries(data);

			let sessionDiv = stateDiv.selectAll('.session-div')
				.data(byImpactBySession).enter()
				.append('div').attr('class', e => `session-div`)
				.sort((a, b) => d3.descending(+a.key, +b.key))
				.html(d => '<div class="session-label">' + d.key + '</div>');

			let impactDiv = sessionDiv.selectAll('.impact-div')
				.data(d => d.values).enter()
				.append('div').attr('class', e => `impact-div ${e.key}-cont`)
				.sort((a, b) => d3.descending(a.key, b.key));

			let billDiv = impactDiv.selectAll('.bill-div')
				.data(d => d.values).enter()
				.append('div').attr('class', 'bill-div')
				.on('mouseover', function(d){
					let billCirc = d3.select(this)
					billHover(d, billCirc)
				})
				.on('mouseout', function(d){
					let billCirc = d3.select(this)
					billMouseOut(d, billCirc)
				})

			
			let billHover = function(d, billCirc) {
				let left = billCirc.node().offsetLeft + 5
				let top = billCirc.node().offsetTop + 15
				
				billCirc.style('border-color', colors['black']['02'])
					.style('border-width', '1px')
					.style('border-style', 'solid')

				tooltip.style('display', 'block');

				tooltip.transition()
					.style('left', left + 'px')
					.style('top', top + 'px')

				tooltip.html(`<div class="tip-bill-title">${d['name']}</div>` + 
					`<div class="tip-bill-id">${d['bill_id']}</div>` + 
					`<div class="tip-bill-groups">Advocacy organizations determining: ${d['organization']}</div>`
					)
			}

			let billMouseOut = function(d, billCirc) {
				billCirc.style('border-color', colors['black']['02'])
					.style('border-width', '0px')
					.style('border-style', 'solid')

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
