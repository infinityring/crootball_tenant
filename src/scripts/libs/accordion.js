import Accordion from "accordion-js";
window.Accordion = Accordion;

window.buildAccordion= (accordionId) => {
    const accordionElement = document.getElementById(accordionId);
    const accordionConfig = accordionElement.dataset.config;
    const accordion = new Accordion(document.querySelector("#" + accordionId), JSON.parse(accordionConfig));
    return accordion;
}