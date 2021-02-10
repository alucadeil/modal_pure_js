Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {}

function _createModalFooter(buttons = []) {
    if(buttons.length === 0){
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer');

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick=btn.handler || noop

        wrap.appendChild($btn)
    })

    return wrap
}

function _createModal(options) {
    const modal = document.createElement('div');
    modal.classList.add('jmodal');
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title" data-title>${options.title || 'Modal title'}</span>
                    ${options.closable ? 
                        `<span class="modal-close" data-close="true">&times;</span>` : ''
                    }
                </div>
                <div class="modal-body" data-content>
                    ${options.content || ''}
                </div>
            </div>
        </div>
    `)
    const footer = _createModalFooter(options.footerButtons);
    footer.appendAfter(modal.querySelector('[data-content]'));
    if (options.width) 
        modal.querySelector('.modal-window').style.width = options.width;
    document.body.appendChild(modal);
    return modal
}

$.modal = function(options) {
    const ANIMATION_SPEED = 100;
    const $modal = _createModal(options);
    let closing = false;

    const modal = {
        open() {
            if(!document.querySelector('.jmodal')) return 
            !closing && $modal.classList.add('open');
        },
        close() {
            closing =  true;
            $modal.classList.remove('open');
            $modal.classList.add('hide');
            setTimeout( () =>{ 
                $modal.classList.remove('hide');
                closing = false;
                if(typeof options.onClose === 'function') {
                    options.onClose()
                }
        }, ANIMATION_SPEED)
        },
        check() {
        }
    }

    const closingHandler = event => {
        if(event.target.dataset.close) {
            modal.close();
        }
    }
    $modal.addEventListener('click', closingHandler)

    return Object.assign(modal, {
        destroy() {
            let check = document.querySelector('.jmodal');
            check && $modal.parentNode.removeChild($modal);
            $modal.removeEventListener('click', closingHandler)

        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html;
        },
        setTitle(title) {
            $modal.querySelector('[data-title]').innerHTML= title
        }
    })
}
