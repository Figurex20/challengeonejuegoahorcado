!(function () {
	let juego = {
		palabra: 'ALURA',
		estado: 7,
		adivinado: ['A', 'L'],
		errado: ['B', 'J', 'K', 'C'],
	};

	let $html = {
		hombre: document.getElementById('hombre'),
		adivinado: document.querySelector('.adivinado'),
		errado: document.querySelector('.errado'),
	};

	function dibujar(juego) {
		// Actualizar la imgaen del hombre
		let estado = juego.estado;
		if (estado === 8) {
			estado = juego.previo;
		}

		let $element;
		$element = $html.hombre;
		$element.src = `../imagenes/0${estado}.png`;

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
			juego.estado--;
			//SE PONE LAS LETRAS EN LAS ERRADAS
			errado.push(letra);
		}
	}

	window.onkeypress = (e) => {
		let letra = e.key;
		//Solo aceptar mayus, minus y ñ. No aceptar ningún otro carácter.
		let regex = /^[a-zA-Z\u00f1\s\u00f1\u00d1]+$/;
		if (/^A-ZÑ/.test(letra)) {
			return;
		}

		adivinar(juego, letra);
		dibujar(juego);
	};
	dibujar(juego);
})();
