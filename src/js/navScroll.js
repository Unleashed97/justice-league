const navScroll = () =>{
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(item =>{
        item.addEventListener('click', e =>{
            e.preventDefault();
            const attr = item.getAttribute('data-target');
            if(attr){
                document.querySelector(`${attr}`).scrollIntoView({behavior: 'smooth'});
            }
        })
    })
}

navScroll();