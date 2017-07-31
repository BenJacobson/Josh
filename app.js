var vertexShaderCode = [
'precision highp float;',
'',
'attribute vec3 coordinates;',
'attribute vec3 color;',
'',
'varying vec3 fragColor;',
'',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'',
'void main(void) {',
'	fragColor = color;',
'	gl_Position = mProj * mView * vec4(coordinates, 1.0);',
'}'
].join('\n');

var fragmentShaderCode = [
'precision highp float;',
'',
'varying vec3 fragColor;',
'',
'void main(void) {',
'	gl_FragColor = vec4(fragColor, 1.0);',
'}'
].join('\n');

function Block(x, y, z, scale, r, g, b) {
	this.location = [x, y, z];
	this.seen = false;
	this.customVertexData = this.vertexData.map((v, i) => {
		if  (i % 6 < 3) v *= scale;
		return v +
			(i % 6 == 0 ? x : 0) +
			(i % 6 == 1 ? y : 0) +
			(i % 6 == 2 ? z : 0) +
			((r !== undefined) && (i % 6 == 3) ? r-v : 0) +
			((g !== undefined) && (i % 6 == 4) ? g-v : 0) +
			((b !== undefined) && (i % 6 == 5) ? b-v : 0);
	});
	this.vertexLength = 24;
}

Block.prototype.setRGB = function(r, g, b) {
	this.customVertexData = this.customVertexData.map((v, i) => {
		return v +
			(i % 6 == 3 ? r-v : 0) +
			(i % 6 == 4 ? g-v : 0) +
			(i % 6 == 5 ? b-v : 0);
	});
}

Block.prototype.vertexData = 
[ // X, Y, Z           R, G, B
	// Top
	-1.0, 1.0, -1.0,   1.0, 1.0, 1.0, // 0.5, 0.5, 0.5,
	-1.0, 1.0, 1.0,    1.0, 1.0, 1.0, // 0.5, 0.5, 0.5,
	1.0, 1.0, 1.0,     1.0, 1.0, 1.0, // 0.5, 0.5, 0.5,
	1.0, 1.0, -1.0,    1.0, 1.0, 1.0, // 0.5, 0.5, 0.5,
    //                 1.0, 1.0, 1.0, // 
	// Left            1.0, 1.0, 1.0, // 
	-1.0, 1.0, 1.0,    1.0, 1.0, 1.0, // 0.75, 0.25, 0.5,
	-1.0, -1.0, 1.0,   1.0, 1.0, 1.0, // 0.75, 0.25, 0.5,
	-1.0, -1.0, -1.0,  1.0, 1.0, 1.0, // 0.75, 0.25, 0.5,
	-1.0, 1.0, -1.0,   1.0, 1.0, 1.0, // 0.75, 0.25, 0.5,
	//				   1.0, 1.0, 1.0, // 
	// Right           1.0, 1.0, 1.0, // 
	1.0, 1.0, 1.0,     1.0, 1.0, 1.0, // 0.25, 0.25, 0.75,
	1.0, -1.0, 1.0,    1.0, 1.0, 1.0, // 0.25, 0.25, 0.75,
	1.0, -1.0, -1.0,   1.0, 1.0, 1.0, // 0.25, 0.25, 0.75,
	1.0, 1.0, -1.0,    1.0, 1.0, 1.0, // 0.25, 0.25, 0.75,
	//				   1.0, 1.0, 1.0, // 
	// Front           1.0, 1.0, 1.0, // 
	1.0, 1.0, 1.0,     1.0, 1.0, 1.0, // 1.0, 0.0, 0.15,
	1.0, -1.0, 1.0,    1.0, 1.0, 1.0, // 1.0, 0.0, 0.15,
	-1.0, -1.0, 1.0,   1.0, 1.0, 1.0, // 1.0, 0.0, 0.15,
	-1.0, 1.0, 1.0,    1.0, 1.0, 1.0, // 1.0, 0.0, 0.15,
	//				   1.0, 1.0, 1.0, // 
	// Back            1.0, 1.0, 1.0, // 
	1.0, 1.0, -1.0,    1.0, 1.0, 1.0, // 0.0, 1.0, 0.15,
	1.0, -1.0, -1.0,   1.0, 1.0, 1.0, // 0.0, 1.0, 0.15,
	-1.0, -1.0, -1.0,  1.0, 1.0, 1.0, // 0.0, 1.0, 0.15,
	-1.0, 1.0, -1.0,   1.0, 1.0, 1.0, // 0.0, 1.0, 0.15,
	//				   1.0, 1.0, 1.0, // 
	// Bottom          1.0, 1.0, 1.0, // 
	-1.0, -1.0, -1.0,  1.0, 1.0, 1.0, // 0.5, 0.5, 1.0,
	-1.0, -1.0, 1.0,   1.0, 1.0, 1.0, // 0.5, 0.5, 1.0,
	1.0, -1.0, 1.0,    1.0, 1.0, 1.0, // 0.5, 0.5, 1.0,
	1.0, -1.0, -1.0,   1.0, 1.0, 1.0, // 0.5, 0.5, 1.0,
];

Block.prototype.indexData =
[
	// Top
	0, 1, 2,
	0, 2, 3,

	// Left
	5, 4, 6,
	6, 4, 7,

	// Right
	8, 9, 10,
	8, 10, 11,

	// Front
	13, 12, 14,
	15, 14, 12,

	// Back
	16, 17, 18,
	16, 18, 19,

	// Bottom
	21, 20, 22,
	22, 20, 23
];

function Plane(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4) {
	this.customVertexData = [
		x1, y1, z1,    0.5, 0.25, 0.05,
		x2, y2, z2,    0.5, 0.25, 0.05,
		x3, y3, z3,    0.5, 0.25, 0.05,
		x4, y4, z4,    0.5, 0.25, 0.05
	];
	this.vertexLength = 6;
}

Plane.prototype.indexData = [
	0, 1, 2,
	0, 2, 3
];

function init() {
	let canvas = document.getElementById('glCanvas');
	let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

	if (!gl) {
		alert('Your browser does not support WebGL');
		return;
	}

	function ran(max, start) {
		max = max || 1;
		start = start || 0;
		return start + Math.random()*max;
	}

	// make all the meshes
	let meshes = []; // [new Block(-3, -3, 0), new Block(3, 3, 0), new Block(-3, 3, 0), new Block(3, -3, 0), new Block(0, 0, 0)];
	for (let i = 0; i < 2700; i++) {
		let x = ran(10000, -5000);
		let y = ran(10000, -5000);
		let z = ran(10000, -5000);
		meshes.push(new Block(x, y, z, 3, ran(), ran(), ran()));
	}
	let redGiants = [];
	let totalRedGiants = 5;
	for(let i = 0; i < totalRedGiants; i++) {
		let redGiant = new Block(ran(10000, -5000),ran(10000, -5000),ran(10000, -5000), 15, 1.0, 0, 0);
		meshes.push(redGiant);
		redGiants.push(redGiant);
	}


	for(let i = 0; i < 20 ; i++) {
		let newStar = new Block(ran(10000, -5000),ran(10000, -5000),ran(10000, -5000), 5, 1.0, 0, 1.0);
		meshes.push(newStar);
	}
	let meganStar = new Block(0, -20, 0, 15, 0, 1.0, 1.0);
	meshes.push(meganStar);


	// let boundaries = 10000;
	// meshes.push(new Plane(
	// 	-boundaries, -2.55, -boundaries,
	// 	-boundaries, -2.55, boundaries,
	// 	 boundaries, -2.55, boundaries,
	// 	 boundaries, -2.55, -boundaries,
	// ));

	let vertexData = Array.prototype.concat.apply([], meshes.map(p => p.customVertexData));
	let offset = 0;
	let indexData = Array.prototype.concat.apply([], meshes.map((p, m) => {
		let ret = p.indexData.map(i => i + offset);
		offset += p.vertexLength;
		return ret;
	}));


	let vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	let indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	let vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vertexShaderCode);
	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('Failed to compile vertex shader');
		return;
	}

	let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fragmentShaderCode);
	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('Failed to compile fragment shader');
		return;
	}

	let shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);

	gl.linkProgram(shaderProgram);
	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.error('Failed to link program');
		return;
	}

	gl.validateProgram(shaderProgram);
	if (!gl.getProgramParameter(shaderProgram, gl.VALIDATE_STATUS)) {
		console.error('Failed to validate program');
		return;
	}

	gl.useProgram(shaderProgram);
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

	let attributeCoord = gl.getAttribLocation(shaderProgram, 'coordinates');
	gl.vertexAttribPointer(
		attributeCoord,
		3,
		gl.FLOAT,
		gl.FALSE,
		6*Float32Array.BYTES_PER_ELEMENT,
		0*Float32Array.BYTES_PER_ELEMENT
	);

	let attributeColor = gl.getAttribLocation(shaderProgram, 'color');
	gl.vertexAttribPointer(
		attributeColor,
		3,
		gl.FLOAT,
		gl.FALSE,
		6*Float32Array.BYTES_PER_ELEMENT,
		3*Float32Array.BYTES_PER_ELEMENT
	);

	gl.enableVertexAttribArray(attributeCoord);
	gl.enableVertexAttribArray(attributeColor);

	gl.clearColor(0, 0, 0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);

	let matViewUniformLocation = gl.getUniformLocation(shaderProgram, 'mView');
	let matProjUniformLocation = gl.getUniformLocation(shaderProgram, 'mProj');

	let viewMatrix = new Float32Array(16);
	let projMatrix = new Float32Array(16);
	mat4.identity(viewMatrix);
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 1.0, 50000.0);

	gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

	//
	// resize handler
	//
	function resize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		gl.viewport(0, 0, window.innerWidth, window.innerHeight);
		mat4.perspective(projMatrix, glMatrix.toRadian(45), window.innerWidth / window.innerHeight, 1.0, 50000.0);
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
	}
	document.body.onresize = resize;
	resize();

	//
	// state varialbes
	//
	let keysPressed = {};
	let x=0, y=0, z=0, roty=Math.PI/4, rotx=0;
	let frameRotx = 0; frameRoty = 0;
	let mouseX = 0;
	let mouseY = 0;
	let mouseChange = false;
	let origin = [0, 0, 0];
	let change = true;
	let TAU = Math.PI * 2;
	let halfPI = Math.PI / 2;
	let baseTranslateFactor = 15;
	let baseRotateFactor = 1000;
	let baseTranslateSpeed = 0.7;
	let baseRotateSpeed = 0.01;
	let mouseLook = false;
	let timeBased = false;
	let counterTopElement = document.getElementById('counterTopLine');
	let counterBottomElement = document.getElementById('counterBottomLine');
	let redGiantsFound = 0;

	//
	// star counter
	//
	function updateCounter() {
		if (redGiantsFound !== redGiants.length) {
			counterTopElement.innerText = `Find all ${redGiants.length} red Giants.`;
			counterBottomLine.innerText = `You have found ${redGiantsFound} red Giant(s).`;
		} else {
			counterTopElement.innerText = `You found all ${redGiants.length}!`;
			counterBottomLine.innerText = `Congratulations, You Win!`;
		}
	}
	updateCounter();

	//
	// key handler
	//
	document.body.onkeydown = (event) => {
		keysPressed[event.key] = performance.now();
	};

	document.body.onkeyup = (event) => {
		keysPressed[event.key] = undefined;
	};

	//
	// mouse handler
	//
	document.body.onmousemove = (event) => {
		if (mouseLook) {
			mouseX = Math.PI * event.clientY / canvas.clientHeight - halfPI;
			mouseY = Math.PI * event.clientX / canvas.clientWidth - halfPI;
			change = true;
		}
	};

	//
	// movement
	//
	function move() {
		let now = performance.now();
		let rotateSpeed = baseRotateSpeed * (keysPressed['e'] ? 2 : 1);
		let translateSpeed = baseTranslateSpeed * (keysPressed['e'] ? 10 : 1);
		let rotateFactor = baseRotateFactor / (keysPressed['e'] ? 2 : 1);
		let translateFactor = baseTranslateFactor / (keysPressed['e'] ? 10 : 1);
		frameRotx = rotx + mouseX;
		frameRoty = roty + mouseY;
		if (keysPressed['w']) {
			let speed =  (now - keysPressed['w']) / translateFactor;
			keysPressed['w'] = now;
			let v = timeBased ?
						[0, 0, speed] :
						[0, 0, translateSpeed];
			vec3.rotateX(v, v, origin, -frameRotx);
			vec3.rotateY(v, v, origin, -frameRoty);
			x += v[0];
			y += v[1];
			z += v[2];
			change = true;
		}
		if (keysPressed['s']) {
			let speed = (now - keysPressed['s']) / translateFactor;
			keysPressed['s'] = now;
			let v = timeBased ?
					[0, 0, -speed] :
					[0, 0, -translateSpeed];
			vec3.rotateX(v, v, origin, -frameRotx);
			vec3.rotateY(v, v, origin, -frameRoty);
			x += v[0];
			y += v[1];
			z += v[2];
			change = true;
		}
		if (keysPressed['a']) {
			let speed = (now - keysPressed['a']) / translateFactor;
			keysPressed['a'] = now;
			let v = timeBased ?
					[speed, 0, 0] :
					[translateSpeed, 0, 0];
			vec3.rotateX(v, v, origin, -frameRotx);
			vec3.rotateY(v, v, origin, -frameRoty);
			x += v[0];
			y += v[1];
			z += v[2];
			change = true;
		}
		if (keysPressed['d']) {
			let speed = (now - keysPressed['d']) / translateFactor;
			keysPressed['d'] = now;
			let v = timeBased ?
					[-speed, 0, 0] :
					[-translateSpeed, 0, 0];
			vec3.rotateX(v, v, origin, -frameRotx);
			vec3.rotateY(v, v, origin, -frameRoty);
			x += v[0];
			y += v[1];
			z += v[2];
			change = true;
		}
		if (keysPressed[' ']) {
			let v = [0, -translateSpeed, 0];
			vec3.rotateX(v, v, origin, -frameRotx);
			vec3.rotateY(v, v, origin, -frameRoty);
			x += v[0];
			y += v[1];
			z += v[2];
			change = true;
		}
		if (keysPressed['ArrowLeft']) {
			let speed = (now - keysPressed['ArrowLeft']) / rotateFactor;
			keysPressed['ArrowLeft'] = now;
			roty -= timeBased ?
					speed :
					rotateSpeed;
			if (roty < 0) {
				roty += TAU;
			}
			change = true;
		}
		if (keysPressed['ArrowRight']) {
			let speed = (now - keysPressed['ArrowRight']) / rotateFactor;
			keysPressed['ArrowRight'] = now;
			roty += timeBased ?
					speed :
					rotateSpeed;
			if (roty > TAU) {
				roty -= TAU;
			}
			change = true;
		}
		if (keysPressed['ArrowUp']) {
			let speed = (now - keysPressed['ArrowUp']) / rotateFactor;
			keysPressed['ArrowUp'] = now;
			rotx -= timeBased ?
					speed :
					rotateSpeed;
			if (rotx < -halfPI) {
				rotx = -halfPI;
			}
			change = true;
		}
		if (keysPressed['ArrowDown']) {
			let speed = (now - keysPressed['ArrowDown']) / rotateFactor;
			keysPressed['ArrowDown'] = now;
			rotx += timeBased ?
					speed :
					rotateSpeed;
			if (rotx > halfPI) {
				rotx = halfPI;
			}
			change = true;
		}
		if (change) {
			mat4.identity(viewMatrix);
			mat4.rotateX(viewMatrix, viewMatrix, frameRotx);
			mat4.rotateY(viewMatrix, viewMatrix, frameRoty);
			mat4.translate(viewMatrix, viewMatrix, [x, y, z]);
			gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
			change = false;
		}
	}

	//
	// game logic
	//
	function gameLogic() {
		let currentLocation = [-x, -y, -z];
		let colorChange = false;
		redGiants.forEach(redGiant => {
			if (!redGiant.seen && vec3.distance(redGiant.location, currentLocation) < 60){
				redGiant.setRGB(0, 1.0, 0);
				redGiantsFound++;
				updateCounter();
				redGiant.seen = true;
				colorChange = true;
			}
		});
		if (colorChange) {
			let vertexData = Array.prototype.concat.apply([], meshes.map(p => p.customVertexData));
			gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
		}
	}

	//
	// drawing
	//
	function draw() {
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
		gl.drawElements(gl.TRIANGLES, indexData.length, gl.UNSIGNED_SHORT, 0);
	}

	//
	// Main render loop
	//
	function loop() {
		move();
		gameLogic();
		draw();
		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);

	//
	// settings events
	//
	document.getElementById('mouseLook').addEventListener('change', function(e) {
		mouseLook = e.target.checked;
		if (!mouseLook) {
			rotx = 0;
			mouseX = 0;
			mouseY = 0;
			change = true;
		}
	});
	document.getElementById('timeBased').addEventListener('change', function(e) {
		timeBased = e.target.checked;
	});
}

// https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html
