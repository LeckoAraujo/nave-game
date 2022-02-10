function start() { // Inicio da função start()

	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");


    //Principais variáveis do jogo
	
	var podeAtirar=true;
	var jogo = {}
	var velocidade=5;
	var posicaoY = parseInt(Math.random() * 334);
	var TECLA = {
		UP: 38,
		DOWN: 40,
		RIGHT: 39
		}
	
	jogo.pressionou = [];

	//Verifica se o usuário pressionou alguma tecla	
	
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
		});
	
	
		$(document).keyup(function(e){
		   jogo.pressionou[e.which] = false;
		});
	
	//Game Loop

	jogo.timer = setInterval(loop,30);
	
	function loop() {
	
	movefundo();
	movejogador();
	moveinimigo1();
	moveinimigo2();
	moveamigo();
	
	} // Fim da função loop()


    //Função que movimenta o fundo do jogo
	
	function movefundo() {
	
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position",esquerda-1);
        
    } // fim da função movefundo()


	function movejogador() {

		if (jogo.pressionou[TECLA.UP]) {
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo-10);

			if (topo<=0) {
				$("#jogador").css("top",topo+10);
			}
		
		}
		
		if (jogo.pressionou[TECLA.DOWN]) {
			
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo+10);

			if (topo>=434) {	
				$("#jogador").css("top",topo-10);		
			}
		}
		
		if (jogo.pressionou[TECLA.RIGHT]) {
			
			//Chama função Disparo
			disparo();
		}
	
	} // fim da função movejogador()


	function moveinimigo1() {

		posicaoX = parseInt($("#inimigo1").css("left"));
		$("#inimigo1").css("left",posicaoX-velocidade);
		$("#inimigo1").css("top",posicaoY);
			
			if (posicaoX<= -256) {
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",950);
			$("#inimigo1").css("top",posicaoY);
				
			}
	} //Fim da função moveinimigo1()


	function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
		$("#inimigo2").css("left",posicaoX-3);
				
		if (posicaoX<= -165) {
			
		$("#inimigo2").css("left",940);
					
		}
	} // Fim da função moveinimigo2()


	function moveamigo() {
	
		posicaoX = parseInt($("#amigo").css("left"));
		$("#amigo").css("left",posicaoX+1);
					
		if (posicaoX>951) {
			
		$("#amigo").css("left",-45);
					
		}
	
	} // fim da função moveamigo()


	function disparo() {
	
		if (podeAtirar==true) {
			
			podeAtirar=false;
			
			topo = parseInt($("#jogador").css("top"))
			posicaoX= parseInt($("#jogador").css("left"))
			tiroX = posicaoX + 180;
			topoTiro=topo+52;
			$("#fundoGame").append("<div id='disparo'></div");
			$("#disparo").css("top",topoTiro);
			$("#disparo").css("left",tiroX);
			
			var tempoDisparo=window.setInterval(executaDisparo, 30);
		
		} //Fecha podeAtirar
	 
		function executaDisparo() {
			posicaoX = parseInt($("#disparo").css("left"));
			$("#disparo").css("left",posicaoX+15); 

				//Pode Atirar Livremente
				/*tempoDisparo=null;
				podeAtirar=true;*/
	
				//Só pode atirar depois do tira sair da tela
				if (posicaoX>900) {
							
					window.clearInterval(tempoDisparo);
					tempoDisparo=null;
					$("#disparo").remove();
					podeAtirar=true;
						
				}

		} // Fecha executaDisparo()
	} // Fecha disparo()
        

} // Fim da função start