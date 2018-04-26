// Rutas y consultas a la API

class Main {
     
     async obtenerFrigorias() {
          
          const respuestaFrigorias = await fetch(`https://private-70cb45-aobara.apiary-mock.com/product/list`);
          const frigoria = await respuestaFrigorias.json();
          return { frigoria }          
     }

     async obtenerImagenes(productId){
          const respuestaImagenes = await fetch('https://private-70cb45-aobara.apiary-mock.com/product/'+ (typeof productId != 'undefined' ? productId : 1) + '/photos');
          const imagenes = await respuestaImagenes.json();
          return { imagenes }         
          console.log(imagenes);
     }

     async obtenerProductos() {
          
          const respuestaProductos = await fetch('https://private-70cb45-aobara.apiary-mock.com/related-product/list');
          const productos = await respuestaProductos.json();
          return { productos }
     }
}