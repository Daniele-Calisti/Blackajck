let valori = ['10','ace','jack','queen','king'];
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
	    		{
	    			if(getValore(giocatore[0]) == getValore(giocatore[1]))
    					document.getElementById('split').disabled = false;
	    		}
	    		
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
	
	document.getElementById(id).innerHTML += '<div class="uk-card-media-top"><img src="../assets/images/cards/'+daDare+'.png" width="150" alt=""></div>';
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
    });
}

main();