// Eventos

const frigorias = new Main();
const ui = new Interfaz();

const spins = document.getElementsByClassName("spin");
for (let i = 0, len = spins.length; i < len; i++) {
    let spin = spins[i],
        span = spin.getElementsByTagName("span"),
        input = spin.getElementsByTagName("input")[0];
    
    input.onchange = () => { input.value += input.value || 0; };
    span[0].onclick = () => { input.value = Math.max(1, input.value - 1); };
    span[1].onclick = () => { input.value -= -1; };
    
    
}

document.querySelector('.carousel').addEventListener('click', (id) => {
        const objeto = id.target;
        const figure = document.querySelector('.figure');
        figure.innerHTML = `<img src= "${objeto.src}" alt="${objeto.alt}" id="${objeto.id}" class="img-responsive">`;
});

document.querySelector('.section-price').addEventListener('click', (e) => {
        e.preventDefault();
        
        const calculo = document.getElementById('calc');         
        const frigoria = document.querySelector('#listado-frigorias');
        const frigoriaSeleccionada = frigoria.options[frigoria.selectedIndex].value;

        frigorias.obtenerImagenes(frigoriaSeleccionada)
        .then(data => {
                if (data.imagenes != null) {
                        ui.cambiarImagen(data.imagenes);
                }
        });

        const ValorFrigorias  = frigorias.obtenerFrigorias()
        .then(frigoria => {
                const frigo = frigoria.frigoria; 
                
                frigo.forEach(data => {
                        if (frigoriaSeleccionada === data.id ) { 
                                
                                let id = data.id;
                                let precio = data.unitPriceInCents / 100; 
                                
                                calculo.setAttribute('min', data.minQuantity);
                                calculo.setAttribute('value', data.minQuantity);
                                            
                                let resultado = precio * calculo.value;

                                ui.limpiarResultados();
                                ui.mostrarResultado(resultado);                  
                        }
                });
        });
});



