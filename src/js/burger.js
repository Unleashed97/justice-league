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

    
}
burger();