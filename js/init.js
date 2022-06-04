let valori = ['2','3','4','5','6','7','8','9','10','ace','jack','queen','king'];
let semi = ['clubs','diamonds','hearts','spades'];
let mazzo =	[];
let giocatore = [];
let dealer = [];

const createMazzo = () => {

	semi.forEach( (el) => {
		valori.forEach( (el2) => {
			let str = el2 + "_of_" + el;
			mazzo.push(str);
		})
	})

	mazzo = mazzo.sort(() => Math.random() - 0.5);

}

const daiCarte = () => {

		let i = 0;
	    let interval;

	    interval = setInterval(() => {
	    	if(i < 4)
	    	{
	    		let cartaDaDare = getCarta();
					levaCarta(cartaDaDare);

		    		switch(i)
					{
						case 0:
							giocatore.push(cartaDaDare);
							renderCarta(7, cartaDaDare);
							break;
						case 1:
							dealer.push(cartaDaDare);
							renderCarta(2, cartaDaDare);
							break;
						case 2:
							giocatore.push(cartaDaDare);
							renderCarta(8, cartaDaDare);
							break;
						case 3:
							dealer.push(cartaDaDare);
							renderCarta(3, "cardback1");
							break;
					}
					if(i == 3)
	    			if(getValore(giocatore[0]) == getValore(giocatore[1]))
	  					document.getElementById('split').disabled = false;
		    		
					i++;
	    	}else
	    	{
	    		clearInterval(interval);
        		interval = null;
	    	}

	    }, 1000);
	    
}

const getValore = card => {

	let appo  = card.split('_');
	if(appo[0] == 'ace')
		return 1;
	if(appo[0] == 'jack' || appo[0] == 'queen' || appo[0] == 'king')
		return 10;

	return parseInt(appo[0]);
}
const renderCarta = (id, daDare) => {
	
	document.getElementById(id).innerHTML += '<div class="uk-card-media-top"><img ' + (id == 3  ? 'id="manoDealer"' : '') + ' src="../assets/images/cards/'+daDare+'.png" width="150" alt=""></div>';
	
	var b = $("#1").position();
	$("#"+id).animate({top:"+" + b.top},200);

	setTimeout( () => {
		var b = $("#"+id).position();
		document.getElementById(id).removeAttribute("style");
		$("#"+id).animate({top:"+" + b.top},200);
	}, 1000);
	
	
}

const addListener = (id, type, action) => {
	document.getElementById(id).addEventListener(type, action);
}

const getCarta = () => {
	let indexCarta = Math.floor(Math.random() * (mazzo.length - 0) + 0);

	return mazzo[indexCarta];
}

const levaCarta = card => {
	var indexCarta = mazzo.indexOf(card);

	mazzo.splice(indexCarta, 1);
}

const getPunteggio = (array) => {
	let punteggio = 0;

	array.forEach( (el) => {
		punteggio += getValore(el);
	});

	return punteggio;
}

const checkSballato = (punteggio) => {
		return punteggio > 21;
}

const stopTurno = () => {
	document.getElementById('buttonGiocatore').style.visibility = 'hidden';
}


const main = () => {
	
	createMazzo();

	let i = 0;
    let interval;

    interval = setInterval(() => {
      if(i == 0)
        alert("Mischio il mazzo...");
      else
      {
       	daiCarte();
       	clearInterval(interval);
        interval = null;
      }
      i++;
    }, i == 0 ? 500 : 3000);

    addListener('carta', 'click', () => {

    	document.getElementById('carta').disabled = true;

    	let cartaDaDare = getCarta();
    	let render = -1;

			levaCarta(cartaDaDare);
			giocatore.push(cartaDaDare);

			switch(giocatore.length)
    	{
    		case 3:
    			render = 9;
    			break;
    		case 4:
    			render = 10;
    			break;
    		case 5:
    			render = 11;
    			break;
    	}

			renderCarta(render, cartaDaDare);

			setTimeout( () => {
				document.getElementById('carta').disabled = false;
			}, 1000);


			setTimeout( () => {
				if(checkSballato(getPunteggio(giocatore)))
				{
					alert("Sballato!");
				}
			}, 1500);
    });

    addListener('stai','click', () => {
    		stopTurno();

    		setTimeout( () => {
    				document.getElementById('manoDealer').src = '../assets/images/cards/' + dealer[0]+'.png';

    				console.log("punteggio --> " + getPunteggio(dealer));

    				while(getPunteggio(dealer) <= 16)
    				{
    					setTimeout( () => {
	    						let cartaDaDare = getCarta();
						    	let render = -1;

									levaCarta(cartaDaDare);
									dealer.push(cartaDaDare);

									switch(giocatore.length)
						    	{
						    		case 3:
						    			render = 4;
						    			break;
						    		case 4:
						    			render = 5;
						    			break;
						    		case 5:
						    			render = 6;
						    			break;
						    	}

						    	renderCarta(render, cartaDaDare);
    					}, 700);
    				}

    		}, 1000);

    });
}

main();


