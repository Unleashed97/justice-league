const navScroll = () =>{
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(item =>{
        item.addEventListener('click', e =>{
            e.preventDefault();
            navLinks.forEach(i => {
                i.classList.remove('active');
            })
            item.classList.add('active');
            const attr = item.getAttribute('data-target');
            const headerHeight = 70;
            if(attr){                
                let blockHeight = document.querySelector(`${attr}`).offsetTop - headerHeight;            
                window.scrollTo({
                    top: `${blockHeight}`,
                    behavior: "smooth"
                });
            }
        })
    })
}
navScroll();