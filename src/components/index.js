//rec = {
//	top: '25px',
//	left: '96px',
//	width: '64px',
//	height: '96px'
//}

const { parse } = require("@babel/core");

function updateStructure(recA,recB){
	if(contains(recA,recB)){
		const relativeDimension = relative(recA, recB);
		return {...recA ,children:[relativeDimension]};
	}
	else if(contains(recB, recA)){
		const relativeDimension = relative(recB, recA);
		return {...recB ,children:[relativeDimension]};
	}
	else{
		return {...recA};
	}
}
function relative(recA, recB){
	const recAn = normalize(recA);
	const recBn = normalize(recB);

	const res = { 
		children : recB.children
	}

	if(recB.top){
		res.top = `${recBn.x1  - recAn.x1}px`;
	}
	if(recB.left){
		res.left = `${recBn.y1  - recAn.y1}px`;
	}
	if(recB.height){
		res.height = recB.height;
	}
	if(recB.width){
		res.width = recB.width;
	}
	if(recB.bottom){
		res.bottom = `${recAn.x2  - recBn.x2}px`;
	}
	if(recB.right){
		res.right = `${recAn.y2  - recBn.y2}px`;
	}
	return res;
}

const T = 0;
const W = 0;

function normalize(rec){
	return {
		x1 : rec.top ? parseInt(rec.top) : (T - (parseInt(rec.bottom) + parseInt(rec.height))),
		y1 : rec.left ? parseInt(rec.left) : (W - (parseInt(rec.right) + parseInt(rec.width))), 
		x2 : rec.bottom ?(T -  parseInt(rec.bottom)) : (parseInt(rec.top) + parseInt(rec.height)),
		y2 : rec.right ?(W -  parseInt(rec.right)) : (parseInt(rec.left) + parseInt(rec.width))
	}
}

function contains(recA, recB){
	const recAn = normalize(recA);
	const recBn = normalize(recB);
	if(
		recAn.x1 <= recBn.x1 && recAn.y1 <= recBn.y1 && 
		recAn.x2 >= recBn.x2 && recAn.y2 >= recBn.y2 
	){
		return true;
	}
	return false;
}

module.exports = updateStructure;
