!(function () {
	let $new_word = document.createElement('div');
	let $input = document.createElement('input');
	let $add = document.createElement('button');
	let letras_erradas = [];
	let palabras = [
		'ALURA',
		'NIÑO',
		'AFINIDAD',
		'PORGRAMAR',
		'ORACLE',
		'YOUTUBE',
	];

	let fin = false;

	//VARIABLE PARA ALMACENAR LA CONFIRMACION
	let juego = null;
	//VALIDAR SI YA SE ENVIO UNA ALARTA
	let end = false;

	let $html = {
		hombre: document.getElementById('hombre'),
		adivinado: document.querySelector('.adivinado'),
		errado: document.querySelector('.errado'),
		hombre_ahorcado: document.querySelector('.hombre-ahorcado'),
		buttons: document.querySelector('.botones'),
		new_word: document.querySelector('#new'),
		desistir: document.querySelector('#desistir'),
		btn_game: document.querySelector('#game'),
	};

	function dibujar(juego) {
		// Actualizar la imgaen del hombre
		let estado = juego.estado;
		if (estado === 8) {
			estado = juego.previo;
		}

		let $element;
		$element = $html.hombre;
		$element.src = `/imagenes/0${estado}.png`;

		//Creamos las letras adivinadas
		let palabra = juego.palabra;
		let adivinado = juego.adivinado;
		$element = $html.adivinado;
		//BORRAR ELEMENOS ANTERIORES
		$element.innerHTML = '';
		for (let letra of palabra) {
			let $span = document.createElement('span');
			let $txt = document.createTextNode('');
			if (adivinado.indexOf(letra) >= 0) {
				$txt.nodeValue = letra;
			}
			$span.setAttribute('class', 'letra adivinada');
			$span.appendChild($txt);
			$element.appendChild($span);
		}

		//Creamos las letras erradas
		let errado = juego.errado;
		//BORRAR ELEMENOS ANTERIORES
		$element = $html.errado;
		$element.innerHTML = '';
		for (const letra of errado) {
			let $span = document.createElement('span');
			let $txt = document.createTextNode(letra);
			$span.setAttribute('class', 'letra errada');
			$span.appendChild($txt);
			$element.appendChild($span);
			letras_erradas.push(letra);
		}
	}

	function adivinar(juego, letra) {
		let estado = juego.estado;
		// SI YA SE HA PERDIDO O GANADO NO HACER NADA
		if (estado === 1 || estado === 8) {
			return;
		}

		//SI YA HEMOS ADIVINADO O ERRADO LA LETRA NO HACER NADA
		let adivinado = juego.adivinado;
		let errado = juego.errado;
		if (adivinado.indexOf(letra) >= 0) {
			return;
		}

		let palabra = juego.palabra;
		//¿LA LETRA ESTÁ EN LA PALABRA?
		if (palabra.indexOf(letra) >= 0) {
			let ganado = true;
			//¿llegamos al estado ganado?
			for (const l of palabra) {
				if (adivinado.indexOf(l) < 0 && l !== letra) {
					ganado = false;
					juego.previo = juego.estado;
					break;
				}
			}
			//si ganamos hay que indicarlo
			if (ganado) {
				juego.estado = 8;
			}
			adivinado.push(letra);
		} else {
			// SI NO ES LA LETRA
			// MAS CERCA DE LA AHORCA
			if (!errado.includes(letra)) {
				juego.estado--;
				//SE PONE LAS LETRAS EN LAS ERRADAS
				errado.push(letra);
			} else {
				alert('Ya has escrito esta letra');
			}
		}
	}

	window.onkeypress = (e) => {
		if (!fin) {
			let letra = e.key.toUpperCase();

			if (/^A-ZÑ/.test(letra)) {
				return;
			}

			adivinar(juego, letra);
			let estado = juego.estado;

			if (estado === 8 && !end) {
				setTimeout(() => {
					alert('¡GANASTE!');
				}, 500);
				end = true;
			} else if (estado === 1 && !end) {
				setTimeout(() => {
					alert(`¡PERDISTE! la palabra era ${juego.palabra}`);
				}, 500);
				end = true;
			}

			dibujar(juego);
			show(estado);
		}
	};

	function palabraAlatoria() {
		let index = Math.floor(Math.random() * palabras.length);
		return palabras[index];
	}

	window.nuevoJuego = () => {
		let palabra = palabraAlatoria();
		juego = {};
		juego.palabra = palabra;
		juego.estado = 7;
		juego.adivinado = [];
		juego.errado = [];
		dibujar(juego);
		end = false;
		fin = false;
		$html.hombre_ahorcado.classList.remove('hidden');
		$html.adivinado.classList.remove('hidden');
		$html.errado.classList.remove('hidden');
		$html.buttons.classList.remove('top');
		$html.desistir.classList.remove('hidden');
		$html.new_word.classList.add('hidden');
		$new_word.classList.add('hidden');
	};

	window.vuelve = () => {
		const again = () => {
			$html.hombre_ahorcado.classList.add('hidden');
			$html.adivinado.classList.add('hidden');
			$html.errado.classList.add('hidden');
			$html.buttons.classList.add('top');
			$html.desistir.classList.add('hidden');
			$html.new_word.classList.remove('hidden');
			setTimeout(() => {
				alert('¡Vuelve a jugar!');
			}, 500);
		};
		console.log('hola');
		again();
	};

	window.new_word = () => {
		if (!fin) {
			fin = true;

			$new_word.setAttribute('class', 'new_word');

			$input.setAttribute('id', 'input_word');

			$add.setAttribute('class', 'add');
			$add.setAttribute('onclick', 'add2()');
			$add.innerHTML = 'add';

			$new_word.appendChild($input);
			$new_word.appendChild($add);

			$html.buttons.appendChild($new_word);

			$html.hombre_ahorcado.classList.add('hidden');
			$html.adivinado.classList.add('hidden');
			$html.errado.classList.add('hidden');
			$html.buttons.classList.add('top');

			window.add2 = () => {
				let palabra = input_word.value;
				//Solo aceptar mayus y ñ. No aceptar ningún otro carácter.
				let regex = /^[A-Z\u00f1\s\u00f1\u00d1]+$/;
				if (
					regex.test(palabra) &&
					palabra.length <= 8 &&
					!palabras.includes(palabra)
				) {
					palabras.push(palabra);
					input_word.value = '';
					alert('¡Palabra añadida!');
				} else {
					alert('No se puede añadir la palabra');
				}
			};
		}
	};
})();
