const navDesliz = () => {
    const hamburguesa = document.querySelector('.hamburguesa');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li')
    
    
    hamburguesa.addEventListener('click',()=>{
        //Alternación de Clase (Toggle):
        nav.classList.toggle('nav-activo');

        //Animación Links:
        navLinks.forEach((link, index)=>{
            if(link.style.animation){
                link.style.animation = ''
            } else {
                link.style.animation = `navLinkAparece 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        //Animacion de Hamburguesa:
        hamburguesa.classList.toggle('cambio');
    });

}

navDesliz();