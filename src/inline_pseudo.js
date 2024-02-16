//@ts-check
/**
 * @fileoverview A micro-library that allows pseudo classes to be styled inline
 */

/**
 * List of events to track
 * @type {Array<string>}
 */
const EVENTS = ['mouseenter', 'mouseleave', 'focus', 'focusin', 'focusout', 'blur', 'change', 'beforeinput', 'input', 'click', 'mousedown', 'mouseup', 'mouseover', 'keydown', 'keyup'];

/**
 * Given inline style as a string, create a CSSDeclaration
 * @param {string} inlineStyle - The inline style string
 * @returns {CSSStyleDeclaration} The created CSSDeclaration
 */
function createCSSDeclaration(inlineStyle) {
    const template = document.createElement('template');
    template.setAttribute('style', inlineStyle);
    return template.style;
}

/**
 * Applies styles based on default and pseudo-classes
 */
function applyStyles(element) {
    const apply = () => {
        let defaultStyle = '';
        if (element.hasAttribute('style:default')) {
            defaultStyle = element.getAttribute('style:default');
        } else {
            defaultStyle = element.getAttribute('style') || '';
            element.setAttribute('style:default', defaultStyle);
        }

        const styles = [defaultStyle];
        const attributeNames = element.getAttributeNames();
        const pseudoClasses = attributeNames
            .filter(attributeName => attributeName !== 'style:default' && attributeName.startsWith('style:'))
            .map(attributeName => attributeName.slice(6));

        pseudoClasses.forEach(pseudoClass => {
            const applyStyle = element.matches(`:${pseudoClass}`);
            const style = element.getAttribute(`style:${pseudoClass}`);
            if (applyStyle && style !== undefined) {
                const cssDeclaration = createCSSDeclaration(style);
                styles.push(cssDeclaration.cssText);
            }
        });

        const cssDeclaration = createCSSDeclaration(styles.join(' '));
        
        element.setAttribute('style', cssDeclaration.cssText);
    };

    /** Apply the styles immediately */
    apply()
    /** Allow browser event loop to finish cycle and re-apply styles */
    setTimeout(() => {
       apply();
    }, 0);
}

/**
 * Event listeners for applying styles on specified events
 */
EVENTS.forEach(type => {
    document.body.addEventListener(type, (event) => {
        document.body.querySelectorAll('*').forEach(element => {
            applyStyles(element);
        });
    }, { passive: true, capture: true });
});

/**
 * Options for the observer (which mutations to observe)
 * @type {MutationObserverInit}
 */
const config = { attributes: false, childList: true, subtree: true };

/**
 * Callback function to execute when mutations are observed
 * @param {Array<MutationRecord>} mutationList - The list of mutations observed
 * @param {MutationObserver} observer - The MutationObserver instance
 */
const callback = (mutationList, observer) => {
    if (mutationList === null) return;
    for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
            [...mutation.addedNodes].forEach(node => {
                if (node instanceof HTMLElement) {
                    applyStyles(node);
                    node.querySelectorAll('*').forEach(element => {
                        applyStyles(element);
                    });
                }
            })
        }
    }
};

/**
 * Create an observer instance linked to the callback function
 * @type {MutationObserver}
 */
const observer = new MutationObserver(callback);

/**
 * Start observing the target node for configured mutations
 */
observer.observe(document.body, config);

applyStyles(document.body);