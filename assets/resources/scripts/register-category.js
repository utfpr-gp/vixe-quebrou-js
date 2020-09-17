(function () {
    const ERROR_MESSAGE = 'Por favor, preencha todos os campos do formulário';
    const SUCCESS_MESSAGE = 'Categoria cadastrada com sucesso!';
    const SUCCESS_TOKEN = 'success';

    window.onload = function () {
        const params = window.location.search;
        const urlSearchParams = new URLSearchParams(params);
        const tokenValue = urlSearchParams.get('token');

        const renderItemList = () => {
            //apresenta a lista de categorias
            let categories = database.getArray('categories');
            let listDiv = document.getElementById('div-list');
            listDiv.innerHTML = "";
            for (let c of categories) {
                //setado o prototype para ter acesso aos métodos gets e sets
                Object.setPrototypeOf(c, new Category());
                console.log(c);
                listDiv.innerHTML += `<div class="col s12 m6" >  
                <div class="col s12"> 
                    <div class="row card-panel">         
                        <div class="col s3 my-item-icon"><i class="material-icons small">${c.icon}</i></div>
                        <div class="col s6 my-item-text">${c.name}</div>
                        <div class="col s3 my-item-text right-align blue-text">${c.id}</div>
                        <div class="col s12 right-align"><i style="cursor: pointer" class="material-icons small" data-key-category="${c.id}">delete</i></div>
                    </div>
                </div>
            </div>`;
            }
        }

        if (tokenValue == SUCCESS_TOKEN) {
            showAlert(SUCCESS_MESSAGE);
        }

        //apresenta a lista de categorias
        renderItemList();

        document.getElementById('div-list').addEventListener('click', function (e) {
            let id = e.target.dataset.keyCategory;
            if (database.removeItemArray('categories', id)) {
                renderItemList();
                setTimeout("alert('Removido com sucesso')", 500);
            } else {
                alert('Opps! O item não foi removido!');
            }

        });
    };

    document.querySelector('#form-category').onsubmit = function () {

        if (!formValidate()) {
            showAlert(ERROR_MESSAGE);
            return false;
        }

        let name = document.querySelector('#input-category').value;
        let select = document.querySelector('#select-category');
        let icon = select.options[select.selectedIndex].text;

        let c = new Category(database.sequenceId('categories'), name, icon);
        database.saveItemArray('categories', c);
        console.log(location);
        //seta um parâmetro        
        location.href = `${location.origin}${location.pathname}?token=${SUCCESS_TOKEN}`;

        return false;
    };

    /**
     * Valida se a string é vazia ou se a primeira opção foi selecionada no select.
     */
    function formValidate() {
        let name = document.querySelector('#input-category').value;
        let selectedIndex = document.querySelector('#select-category').selectedIndex;
        if (name.trim().length == 0 || selectedIndex == 0) {
            return false;
        }
        return true;
    }

    function showAlert(text) {
        spanMessage.textContent = text;
        const alertDiv = document.getElementsByName('div-alert')[0];
        alertDiv.classList.remove('my-hide');
        alertDiv.classList.add('my-show');
        window.setTimeout(() => {
            alertDiv.classList.remove('my-show');
            alertDiv.classList.add('my-hide');
        }, 3000);
    }
})();