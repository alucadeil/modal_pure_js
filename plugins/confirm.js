$.confirm = function (options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            width: '400px',
            closable: true,
            content: options.content,
            onClose() {
                modal.destroy()
            },
            footerButtons: [
                {text: 'Удалить', type: 'danger', handler() { 
                    modal.close()
                    resolve()
                }},
                {text: 'Отмена', type: 'secondary', handler() { 
                    modal.close()
                    reject()
                }}
            ]
        })
        setTimeout(() => modal.open(), modal.ANIMATION_SPEED)
    })
}