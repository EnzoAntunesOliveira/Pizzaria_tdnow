
function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (email && senha) {
      
        window.location.href = '../app/page1';
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}


function downloadPedido(id) {
    alert(`Baixando o pedido ${id}...`);
    // Lógica para gerar e baixar o arquivo (PDF ou outro formato) pode ser adicionada aqui
}
