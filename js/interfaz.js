// DOM

class Interfaz {
     constructor() {
          this.init();
          this.listado = document.querySelector('.price');
          this.wrapper = document.querySelector('.carousel');    
          this.figure = document.querySelector('.figure');                
     }    

     init() {
          this.imprimirFrigorias();
          this.imprimirImagenes();
          this.imprimirProductos();   
     }

     imprimirFrigorias() {
          const listaFrigorias = frigorias.obtenerFrigorias()
          .then(frigoria =>{
               
               const frigo = frigoria.frigoria;  
               const selectFrigo = document.getElementById('listado-frigorias');

               frigo.forEach(frig => {
                    const option = document.createElement('option');
                    option.value = frig.id;
                    option.appendChild(document.createTextNode(frig.description));
                    selectFrigo.appendChild(option);
               });
          });       
     } 

     limpiarResultados() {
          this.listado.innerHTML ='';
     }

     mostrarResultado(data) {
          
          data = data.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
          data = data.split('').reverse().join('').replace(/^[\.]/,'');         
          data = data.replace(/[^\d\.]*/g,'');
          
          this.listado.innerHTML = `$${data},00`          
     }

     imprimirImagenes() {
          
          const listaImagenes = frigorias.obtenerImagenes()
          .then(imagenes =>{
               const img = imagenes.imagenes;
               let template1 = '';
               let template2 = '';
               
               img.forEach(data => {
               
                    if (data.id == img[0].id) {                    
                         template2 = `<img src="${data.url}" alt="imagen" id="img${data.id}" class="img-figure">`;
                    } 

                    template1 +=`
                         <li>
                              <a href="#">
                                   <img src="${data.url}" alt="imagen" id="img${data.id}" class="img-figure">                           
                              </a>
                         </li>
                    `;                    
               });
               this.wrapper.innerHTML = template1;
               this.figure.innerHTML = template2;
          });
     }

     cambiarImagen(data) {
          let template1 = '';
          let template2 = '';

          data.forEach(fig => {
               
               template1 +=`
                         <li>
                              <img src="${fig.url}" alt="imagen" id="img${fig.id} "class="">
                         </li>
                    `;
               if (fig.id == data[0].id) {
                    template2 = `<img src="${fig.url}" alt="imagen" id="img${fig.id} "class="img-figure">`;
               }
          });
          this.wrapper.innerHTML = template1;
          this.figure.innerHTML = template2;          
     }

     imprimirProductos() {
          const listaProductos = frigorias.obtenerProductos()
          .then(productos => {
               const pro = productos.productos;
               const wrapper = document.querySelector('.productos');
               let lista = '';
               
               pro.forEach(productos => {
                    lista += `
                         <div class= "col-md-4 col-sm-6 col-xs-12">
                              <div class="card">
                                   <img class="img-responsive" src="${productos.pictureUrl !== null ? productos.pictureUrl : ''}">

                                   <div class="card-body">
                                        <div class="card-text">
                                             <h2 class="text-left">${productos.title}</h2>
                                             <p><i class="fa fa-credit-card"></i> Desde $${productos.fromPrice / 100},00-</p>
                                             <p class="lead text-info">${productos.description}</p>
                                             <a href="#" class="btn btn-lg pull-right contratar">Contratar</a>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    `;     
               });
               wrapper.innerHTML = lista;
          });
     }
}