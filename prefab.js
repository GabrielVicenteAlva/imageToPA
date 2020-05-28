var prefab = {
	name : '',
	type : '0',
	offset : 0.,
	objects : []
};

const prefabTypes = {
	Bomb : '0',
	Bullet : '1',
	Beam : '2',
	Spinner : '3',
	Pulse : '4',
	Character : '5',
	Misc1 : '6',
	Misc2 : '7',
	Misc3 : '8',
	Misc4 : '9'
};
Object.freeze(prefabTypes);

const objectTypes = {
	normal : '0',
    helper : '1',
    decoration : '2',
    empty : '3'
};
Object.freeze(objectTypes);

const autoKillTypes = {
	none : '0', // Don't use
    lastKF : '1',
    lastKFOffset : '2',
    fixedTime : '3',
    songTime : '4'
};
Object.freeze(autoKillTypes);

const eventTypes = {
	pos : 'pos',
	sca : 'sca',
	rot : 'rot',
	col : 'col'
};
Object.freeze(eventTypes);

const easeTypes = {
	 line : 'Linear',
	 inst : 'Instant',
	 iSine : 'InSine',
	 oSine : 'OutSine',
	 ioSine : 'InOutSine',
	 iElas : 'InElastic',
	 oElas : 'OutElastic',
	 ioElas : 'InOutElastic',
	 iBack : 'InBack',
	 oBack : 'OutBack',
	 ioBack : 'InOutBack',
	 iBoun : 'InBounce',
	 oBoun : 'OutBounce',
	 ioBoun : 'InOutBounce',
	 iQuad : 'InQuad',
	 oQuad : 'OutQuad',
	 ioQuad : 'InOutQuad',
	 iExpo : 'InExpo',
	 oExpo : 'OutExpo',
	 ioExpo : 'InOutExpo'
};
Object.freeze(easeTypes);

const shapes = {
	sq : ['0','0'], // Square
	sq2 : ['0','1'], // Hollow Square
	sq3 : ['0','2'], // Hollow Square
	cr : ['1','0'], // Circle
	cr2 : ['1','1'],
	cr3 : ['1','4'],
	sCr : ['1','2'], // Semicircle
	sCr2 : ['1','3'],
	qCr : ['1','5'], // Quad Circle
	qCr2 : ['1','6'],
	oCr : ['1','7'], // Oct Circle
	oCr2 : ['1','8'],
	tr : ['2','0'],
	tr2 : ['2','1'],
	rTr : ['2','2'], // Right Triangle
	rTr2 : ['2','3'],
	ar : ['3','0'], // Arrow
	ar2 : ['3','1'],
	hx : ['5','0'],
	hx2 : ['5','1'],
	hx3 : ['5','2'],
	sHx : ['5','3'], // Semi Hexagon
	sHx2 : ['5','4'],
	txt : function(s){
	    return ['4','0',s];
	}
};
Object.freeze(shapes);

class Event {
	constructor(type,t,x,y,r,rx,ry,rz,easeType){
		this.t = String(t);
		this.x = String(x);
		if(type == eventTypes.pos || type == eventTypes.sca)
			this.y = String(y);
		if(r != '0'){
			this.r = String(r);
			this.rx = String(rx);
			if(type == eventTypes.pos || type == eventTypes.sca)
				this.ry = String(ry);
			if(r!='2')
				this.rz = String(rz);
		}
		if(easeType != easeTypes.line)
			this.ct = easeType;
	}
}

class PAObject {
	constructor(st,depth,shape,bin,objectType,autoKillType,autoKillOffset){
		this.id = String(prefab.objects.length);
		this.pt = '101';
		this.po = 0;
		this.p = '';
		this.d = String(depth);
		this.ot = objectType;
		this.st = String(st);
		this.text = shape[0] == '4' ? shape[2] : '';
		this.name = '';
		this.shape = shape[0];
		this.akt = autoKillType;
		this.ako = String(autoKillOffset);
		this.so = shape[1];
		this.o = {
			x : '0',
			y : '0'
		};
		this.ed = {
			"bin" : String(bin),
			"layer" : '0'
		};
		this.events = {
			pos : [],
			sca : [],
			rot : [],
			col : []
		};
		prefab.objects.push(this);
	}
	setCenter(ox,oy){
		this.o.x = String(ox);
		this.o.y = String(oy);
	}
	setParent(obj){
		this.p = obj.id;
	}
	parentOffset(posBool,scaBool,rotBool,posOffset=0.,scaOffset=0.,rotOffset=0.){
		this.pt = posBool ? '1' : '0';
		this.pt += scaBool ? '1' : '0';
		this.pt += rotBool ? '1' : '0';
		this.po = [String(posOffset),String(scaOffset),String(rotOffset)];
	}
	posEvent(t,x,y,easeType=easeTypes.line,r=0,rx=0.,ry=0.,rz=0.){
		this.events.pos.push(new Event(eventTypes.pos,t,x,y,r,rx,ry,rz,easeType));
	}
	scaEvent(t,x,y,easeType=easeTypes.line,r=0,rx=0.,ry=0.,rz=0.){
		this.events.sca.push(new Event(eventTypes.sca,t,x,y,r,rx,ry,rz,easeType));
	}
	rotEvent(t,x,easeType=easeTypes.line,r=0,rx=0.,rz=0.){
		this.events.rot.push(new Event(eventTypes.rot,t,x,0.,r,rx,0.,rz,easeType));
	}
	colEvent(t,x,easeType=easeTypes.line,r=0,rx=0.,rz=0.){
		this.events.col.push(new Event(eventTypes.col,t,x,0.,r,rx,0.,rz,easeType));
	}
	clean(){
		if(this.pt == '101')
			delete this.pt;
		if(this.po == '0')
			delete this.po;
		if(this.shape != '4')
			delete this.text;
		if(this.shape == '0' && this.so == '0')
			delete this.shape;
		if(this.so == '0')
			delete this.so;
	}
}

prefab.clean = function() {
	for(let o of prefab.objects)
		o.clean();
}
