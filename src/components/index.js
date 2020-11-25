//rec = {
//	top: '25px',
//	left: '96px',
//	width: '64px',
//	height: '96px'
//}

function updateStructure(rec1,rec2){
	//contains(1,2) returns true/false if 2 contained in 1
	//relative(1,2) returns relative dimensions of 2 w.r.t 1
	if(contains(rec1, rec2)) {
		const relativeDim = relative(rec1,rec2);
		return {...rec1, children: [relativeDim]}
	}
	else if(contains(rec2, rec1)) {
		const relativeDim = relative(rec2,rec1);
		return {...rec2, children: [relativeDim]}
	}
	else{
		return {...rec1}
	}
}
// reletive dim of rec2 w.r.t rec1
function relative(rec1, rec2){
	const recF1 = normalize(rec1);
	const recF2 = normalize(rec2);

	const res = {
		children: rec2.children
	}
	if(rec2.top) {
		res.top = `${recF2.x1 - recF1.x1}px`;
	}
	if(rec2.left){
		res.left = `${recF2.y1 - recF1.y1}px`
	}
	if(rec2.height){
		res.height = rec2.height;
	}
	if(rec2.width){
		res.width = rec2.width;
	}
	if(rec2.bottom){
		res.bottom = `${recF1.x2 - recF2.x2}px`
	}
	if(rec2.right){
		res.right = `${recF1.y2 - recF2.y2}px`
	}
	return res;
}

//is rec2 inside rec1 or not
function contains(rec1, rec2) {
	const recF1 = normalize(rec1);
	const recF2 = normalize(rec2);

	if(
		recF1.x1 <= recF2.x1,
		&& recF1.y1 <= recF2.y1,
		&& recF1.x2 >= recF2.x2
		&& recF1.y2 >= recF2.y2
		){
			rturn true;
		}
		return false;
}

const T = 0;//total height
const W = 0;//total width

function normalize(rec) {
	return {
		x1: rec.top ? parseInt(rec.top) : (T - (parseInt(rec.bottom) + parseInt(rec.height))),
		y1: rec.left ? parseInt(rec.left) : (W -(parseInt(rec.right) + parseInt(rec.width))),
		x2: rec.bottom ? (T - (parseInt(rec.bottom))) : (parseInt(rec.top) + parseInt(rec.height))
		y2: rec.right ? (W - (parseInt(rce.right))) : (parseInt(rec.left) + parseInt(rec.width))
	}
}

module.exports = updateStructure;
