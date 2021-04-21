const burger = ()=>{
    const burgerBtn = document.querySelector('.burger');
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    const control = document.querySelector('.control');

    burgerBtn.addEventListener('click', ()=>{
        burgerBtn.classList.toggle('active');
        header.classList.toggle('active');
        nav.classList.toggle('active');
        control.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    })

    window.addEventListener('resize', ()=>{
        if(window.screen.width > 768){
            burgerBtn.classList.remove('active');
            header.classList.remove('active');
            nav.classList.remove('active');
            control.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    })

    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(item =>{
        item.addEventListener('click', ()=>{
            burgerBtn.classList.remove('active');
            header.classList.remove('active');
            nav.classList.remove('active');
            control.classList.remove('active');
            document.body.classList.remove('no-scroll');
        })
    })
}
burger();