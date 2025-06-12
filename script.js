const navDialog=document.getElementById('nav-dialog');
function handleMenu(){
    navDialog.classList.toggle('hidden');
}

const initialTranslateLTR=-48*4;
const initialTranslateRTL=36*4;

function setupIntersectionObserver(element,isLTR,speed){
    const intersectionCallback=(entries)=>{
        const isIntersecting=entries[0].isIntersecting;
        if(isIntersecting){
        document.addEventListener('scroll',scrollHandler);
    }else{
        document.removeEventListener('scroll',scrollHandler);
    }
};
    const intersectionObserver=new IntersectionObserver(intersectionCallback);
   
    intersectionObserver.observe(element);

    function scrollHandler(){
        const translateX=(window.innerHeight-element.getBoundingClientRect().top)*speed;
        let totalTranslate=0;
        if(isLTR){
                totalTranslate=translateX+initialTranslateLTR;
        }else{
               totalTranslate= -(translateX+initialTranslateRTL);
        }
        element.style.transform=`translateX(${totalTranslate}px)`;
        
}
}
const line1=document.getElementById('line1');
const line2=document.getElementById('line2');
const line3=document.getElementById('line3');
const line4=document.getElementById('line4');

setupIntersectionObserver(line1,true,0.15);
setupIntersectionObserver(line2,false,0.15);
setupIntersectionObserver(line3,true,0.15);
setupIntersectionObserver(line4,true,0.8);

document.addEventListener('DOMContentLoaded', () => {
    const codeWindow = document.getElementById('code-window');
    const lines = document.querySelectorAll('.line-of-code');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          codeWindow.style.background = '#1F2937'; // Change to gray when visible
          lines.forEach((line, index) => {
            setTimeout(() => {
              line.classList.add('visible');
            }, index * 500); // Staggered typing effect
          });
          observer.unobserve(codeWindow);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(codeWindow);
  });

// FAQ functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('[aria-controls^="faq-"]');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Get the answer element
            const answerId = question.getAttribute('aria-controls');
            const answer = document.getElementById(answerId);
            const chevron = question.querySelector('.fa-chevron-up');
            
            // Toggle the hidden class
            answer.classList.toggle('hidden');
            
            // Rotate the chevron icon
            if (answer.classList.contains('hidden')) {
                chevron.style.transform = 'rotate(180deg)';
            } else {
                chevron.style.transform = 'rotate(0deg)';
            }
        });
    });
});